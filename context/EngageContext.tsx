'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import { openDB, DBSchema, IDBPDatabase } from "idb";
import { postData } from '@/utils/postData'
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

// TypeScript Interfaces
interface Event {
  ui: string; // category html element type
  id: string; // object html element
  act: string; // action event type
  name?: string; // label 'Intro Video', button text "Subscribe Now" "PageView" "ViewContent" "AddToCart" "Lead"
  val?: any;
  verified?: boolean;
  time?: number;
}

interface EngagesDBSchema extends DBSchema {
  events: {
    key: string;
    value: Event;
    indexes: { 'by-time': number };
  };
}

interface EngageContextType {
  onEvent: (event: Event) => void;
  logEvent: (event: Event) => Promise<void>;
  commit: () => Promise<void>;
  getEvent: (id: string) => any;
  isReady: boolean;
}

// Context Creation
const EngageContext = createContext<EngageContextType | null>(null);

// DB Initialization
const initDB = async () => {
  return openDB<EngagesDBSchema>('engagesDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('events')) {
        const store = db.createObjectStore('events', { keyPath: 'id' });
        store.createIndex('by-time', 'time');
      } else {
        console.log('Database already exists, skipping creation.');

      }
    },
  });
};

export const EngagesProvider = ({ 
  children,
  gaTrackingId,
  pixelId
}: { 
  children: ReactNode;
  gaTrackingId?: string;
  pixelId?: string;
}) => {

  const [isReady, setIsReady] = useState(false);
  const dbInstance = useRef<IDBPDatabase<EngagesDBSchema> | null>(null);
  const lastStates = useRef<Map<string, any>>(new Map());

  // Initialize analytics
  useEffect(() => {
    if (gaTrackingId) ReactGA.initialize(gaTrackingId);
    if (pixelId) ReactPixel.init(pixelId);
  }, [gaTrackingId, pixelId]);

  // Initialize database
  useEffect(() => {
    const initialize = async () => {
      const db = await initDB();
      dbInstance.current = db;

      // Load existing events from DB into lastStates
      const tx = db.transaction('events', 'readonly');
      const events = await tx.objectStore('events').getAll();
      events.forEach(event => {
        lastStates.current.set(event.id, event);
      });

      setIsReady(true);
    };

    initialize();
  }, []);

  // Visibility change handler
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden') {
        await commit();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);




  // get element 
  const getEvent = ( id: string ) => {
    return lastStates.current.get(id);
  }

  // update element on state but not in db
  // Core tracking methods
  const onEvent = (event: Event) => {
    console.log('onEvent', event);
    lastStates.current.set( event.id, {...event, time: (new Date()).getTime()} );
  };

  // log event to GA and FB
  // and store in IndexedDB
  const logEvent = async (event: Event, nonInteraction=false) => {

    console.log('logEvent', event);

    if( JSON.stringify(event.val) == JSON.stringify(lastStates.current.get(event.id)) ) return;
    let d = {...event, time: (new Date()).getTime()}
    
    lastStates.current.set( event.id, d );

    if(event.name) {  
      ReactGA.event({
          category: event.name,
          action: event.act,
          label: event.ui+' '+event.id,
          nonInteraction: nonInteraction
      });
      const pixEvent: Map<string, any> = new Map();
      pixEvent.set('content_name', event.id);
      pixEvent.set('content_category', event.ui);
      pixEvent.set('content_type', event.act);
      ReactPixel.track(event.name, pixEvent || {});
    }
    
    saveEventToDB(d);
  };


  async function saveEventToDB( data: any) {
    if (!dbInstance.current) return;
    try {
      const tx = dbInstance.current.transaction('events', 'readwrite');
      await tx.objectStore('events').put(data);
      await tx.done;
      console.log(`saved event to DB:`);
    } catch (err) {
      console.error(`Error saving to DB events:`, err);
    }
  }


  const commit = async () => {
    if (!dbInstance.current) return;

    const tx = dbInstance.current.transaction('events', 'readwrite');
    const events = await tx.objectStore('events').getAll();

    for (const [key, event] of lastStates.current.entries()) {
      if(event.time > events[event.id]) await logEvent(event);
    }
    
    if (events.length > 0) {
      try {
        await postData("/tracking-endpoint", { events });
        //await tx.objectStore('events').clear();
      } catch (error) {
        console.error('Commit failed:', error);
        // Implement retry logic here
      }
    }
  };


  return (
    <EngageContext.Provider value={{ 
      onEvent,
      logEvent,
      commit,
      getEvent,
      isReady
    }}>
      {children}
    </EngageContext.Provider>
  );
};

// Custom Hook
export const useEngages = () => {
  const context = useContext(EngageContext);
  if (!context) throw new Error("useEngages must be used within an EngagesProvider");
  return context;
};