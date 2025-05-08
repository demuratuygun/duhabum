"use client";

import { metadata } from "@/app/layout";
import { m } from "framer-motion";
import React, { createContext, useContext, useEffect, useRef, ReactNode, useState } from "react";
import { postData } from '@/utils/postData'
import { useEngages } from '@/context/EngageContext';
import { usePathname, useSearchParams } from 'next/navigation';

type ElementEventType = "onEnter" | "onLeave";
type scrollDirectionType = "up" | "down" | null;

type View = {
  id: string;   // element id
  time: number; // start datetime
  ms: number; // mili seconds duration
  y: number; // scroll depth
};
type Click = { id: string; time: number; ms: number; x: number; y: number; };
type Resize = { time: number; w: number; h: number; sh: number; }; // window width, height, scrollHeight

type Pages = {
  url: string;   // element id
  time: number; // start datetime
  ms: number; // mili seconds duration
  y: number; // scroll depth
  views: View[];
  click: Click[];
  resize: Resize[];
};

type TrackingContextType = {
  viewTimes: View[];
  subscribe: ( id: string, callback: ( eventType: ElementEventType, scrollDirection: scrollDirectionType ) => void ) => void;
  unsubscribe: (id: string) => void;
};

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export const useTrackingContext = () => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error("useTrackingContext must be used within TrackingProvider");
  }
  return context;
};

export const TrackingProvider = ({ children }: { children: ReactNode }) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [enterTime, setEnterTime] = useState((new Date()).getTime());
  const sessionId = crypto.randomUUID();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pageEvents = useRef<Pages[]>([]);

  const viewTimes = useRef<View[]>([]);
  const clickTimes = useRef<Click[]>([]);
  const resizeTimes = useRef<Resize[]>([]);
  
  const elementInViewStartTimes = useRef(new Map<string, number>());
  const elementCallbacks = useRef<Map<string, (eventType: ElementEventType, scrollDirection: scrollDirectionType ) => void>>(new Map());
  const previousScrollY = useRef<number>(0);
  const scrollDepth = useRef<number>(0);
  const path = useRef<string|null>(null);



  useEffect(() => {
    
    if(path.current) {
      const pageData = {
        url: path.current,
        time: enterTime,
        ms:(new Date()).getTime() - enterTime,
        y: scrollDepth.current, 
        views: viewTimes.current,
        click: clickTimes.current,
        resize: resizeTimes.current
      }
      pageEvents.current.push( pageData );
      console.log(pageData);
    }
    
    path.current = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    setEnterTime((new Date()).getTime());
    viewTimes.current = [];
    clickTimes.current = [];
    resizeTimes.current = [];
    scrollDepth.current = 0;

  }, [pathname, searchParams]);


  




  // Intersection and Mutation Observer setup
  useEffect(() => {

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > previousScrollY.current ? "down" : "up";
      previousScrollY.current = currentScrollY;

      entries.forEach((entry) => {
        const elementId = entry.target.id;
        if (!elementId) return;

        scrollDepth.current = currentScrollY+window.innerHeight;
        let eventType: ElementEventType | null = null;

        if (entry.isIntersecting) {
          //console.log('IN')
          if (!elementInViewStartTimes.current.has(elementId)) {
            eventType = "onEnter";
            elementInViewStartTimes.current.set(elementId, currentTime);
          }
        } else {
          //console.log('OUT')

          if (elementInViewStartTimes.current.has(elementId)) {
            eventType = "onLeave";
            const startTime = elementInViewStartTimes.current.get(elementId)!;
            const duration = currentTime - startTime;

            viewTimes.current.push({
              id: elementId,
              time: startTime,
              ms:duration,
              y:scrollDepth.current
            });
            elementInViewStartTimes.current.delete(elementId);
          }
        }

        if (eventType && elementCallbacks.current.has(elementId)) {
          elementCallbacks.current.get(elementId)!(
            eventType,
            scrollDirection
          );
        }
      });
    };



    observerRef.current = new IntersectionObserver(handleIntersect, { rootMargin: "-30% 0% -30% 0%", });
    document.querySelectorAll("[data-track]").forEach((element) => {
      if (element.id) observerRef.current?.observe(element);
    });

    // Observe mutated (added removed) elements with IDs in the main element
    function handleMutation(
      nodes: NodeList | Node[],
      action: "observe" | "unobserve",
      observer: IntersectionObserver | null
    ) {
      if (!observer) return;
    
      for (const node of nodes) {
        if (!(node instanceof HTMLElement)) continue;
        if (node.id)  observer[action](node);
    
        const descendantsWithId = node.querySelectorAll?.("[id]");
        descendantsWithId?.forEach((el) => {
          observer[action](el as Element);
        });
      }
    }
    
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          handleMutation(mutation.addedNodes, "observe", observerRef.current);
          handleMutation(mutation.removedNodes, "unobserve", observerRef.current);
        }
      }
    });
    
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mutationObserver.observe(mainElement, {
        childList: true,
        subtree: true,
      });
    }
    
    
    return () => {
      observerRef.current?.disconnect();
      mutationObserver.disconnect();
    }
  }, []);



  const { onEvent, logEvent, getEvent, isReady } = useEngages();
  // Click observer setup
  useEffect(() => {

    const handleMouseDown = (event: MouseEvent) => {
      const startTime = Date.now();
      const target = event.target as HTMLElement | null;
      const targetId = target?.id || "noID";
      const startX = event.clientX;
      const startY = event.clientY + window.scrollY;
  
      const mouseUpHandler = (upEvent: MouseEvent) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        if( target?.tagName == 'button' ) onEvent?.({id:targetId, ui:'button', time: startTime, act:'click' })
        clickTimes.current.push({
          id: `${target?.tagName}#${targetId}.${target?.className}`,
          time: startTime,
          ms: duration,
          x: startX,
          y: startY
        });
        document.removeEventListener("mouseup", mouseUpHandler);
      };
      document.addEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);

  }, []);



    // Resize observer setup
    useEffect(() => {

      const handleResize = () => {
        resizeTimes.current.push({ 
          time: Date.now(), 
          w: window.innerWidth, 
          h: window.innerHeight, 
          sh: document.documentElement.scrollHeight 
        });
      };
  
      document.addEventListener("resize", handleResize);
      return () => document.removeEventListener("resize", handleResize);
  
    }, []);






  // Save data on page unload

  useEffect(() => {
    const handleBeforeUnload = () => {
      
      const remainingEntries: View[] = [];
      elementInViewStartTimes.current.forEach((value, key) => {
        remainingEntries.push({
          id: key,
          time: value,
          ms: Date.now() - value,
          y: window.scrollY + window.innerHeight,
        });
      });
      viewTimes.current.push(...remainingEntries);

      if(path.current) {
        const pageData = {
          url: path.current,
          time: enterTime,
          ms:(new Date()).getTime() - enterTime,
          y: scrollDepth.current, 
          views: viewTimes.current,
          click: clickTimes.current,
          resize: resizeTimes.current,
        }
        pageEvents.current.push( pageData );
        console.log(pageData);
      }

      const metadata: { [key: string]: any } = {};
      if (window.performance) {  
        metadata["navigationTiming"] = window.performance.getEntriesByType("navigation");
        console.log(metadata["navigationTiming"])
      }
      
      postData( "/tracking-endpoint", {
        sessionId: sessionId,
        events: pageEvents.current,
        meta: metadata,
        //user: useUser()
      });

      elementInViewStartTimes.current.clear();
    };
    window.addEventListener("visibilitychange", handleBeforeUnload);
    return () => window.removeEventListener("visibilitychange", handleBeforeUnload);
  }, []);





  // subscribe and unsubscribe callback functions
  const subscribe = (
    id: string,
    callback: (eventType:ElementEventType, scrollDirection:scrollDirectionType) => void
  ) => {
    elementCallbacks.current.set(id, callback);
  };

  const unsubscribe = (id: string) => {
    elementCallbacks.current.delete(id);
  };

  return (
    <TrackingContext.Provider value={{ viewTimes: viewTimes.current, subscribe, unsubscribe }}>
      {children}
    </TrackingContext.Provider>
  );
};


export const useTrackElement = (id: string) => {
  const { subscribe, unsubscribe } = useTrackingContext();
  //const [viewTimes, setViewTimes] = useState<View[]>([]); // view info for the elements that has been leaved the viewport
  const [viewEvent, setViewEvent] = useState<ElementEventType | null>(null); // onEnter or onLeave
  const [scrollDirection, setScrollDirection] = useState<scrollDirectionType>(null); // enter or leave direction

  useEffect(() => {
    if (!id) return;

    const handleVisibilityChange = (
      eventType: ElementEventType,
      direction: scrollDirectionType
    ) => {
      //console.log(eventType, direction);
      setViewEvent(eventType);
      setScrollDirection(direction);
    };

    subscribe(id, handleVisibilityChange);
    return () => unsubscribe(id);
  }, [id, subscribe, unsubscribe]);

  return { viewEvent, scrollDirection };
};