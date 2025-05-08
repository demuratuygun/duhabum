'use client';

import { use, useEffect, useRef, useState } from 'react';
import styles from './nordic.module.css';
import { motion } from 'framer-motion';


const elementViewTimes = new Map<string, number>();
const elementInViewState = new Map<string, number>();

export default function Header({ }: { }) {

    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            const currentTime = performance.now();
            entries.forEach((entry) => {
                const { target, isIntersecting } = entry;
                //console.log(elementViewTimes)
                if (isIntersecting) {
                    elementInViewState.set(target.id, currentTime);
                } else if ( elementInViewState.get(target.id) ) {
                    const viewTime = currentTime - Number(elementInViewState.get(target.id));
                    elementViewTimes.set(target.id+"."+elementInViewState.get(target.id), (elementViewTimes.get(target.id) ?? 0) + Math.trunc(viewTime));
                    elementInViewState.delete(target.id);
                }
            });
        };
    
        observerRef.current = new IntersectionObserver( handleIntersect, { threshold: [0.8] });
    
        document.querySelectorAll("[data-track]").forEach((element) => {
          observerRef.current?.observe(element);
        });
    
        return () => observerRef.current?.disconnect();
      }, []);
    

    return (

      <div style={{ position:'relative', display:'flex', justifyContent:'center', alignItems:'center' }}>
      
      </div>
    );
  }
  