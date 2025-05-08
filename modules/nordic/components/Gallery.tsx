'use client';

import { useState, ReactNode, ReactElement, useEffect, useRef, RefObject, use, useLayoutEffect } from 'react';
import { animate, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import styles from './nordic.module.css';
import React from 'react';
import { get } from 'http';
import ImageView from './ImageView';
import { useRouter } from 'next/navigation';


interface ColumnType {
  images: {
    src: string;
    alt: string;
  }[],
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL'
}

const GalleryContent:ColumnType[] = [
  {
    images: [
      { src: '/transitions/1before.jpeg', alt: 'Image 1' },
      { src: '/transitions/1after.jpeg', alt: 'Image 1' },
      { src: '/transitions/2before.jpeg', alt: 'Image 1' },
      { src: '/transitions/2after.jpeg', alt: 'Image 2' },
      { src: '/transitions/3before.jpeg', alt: 'Image 1' },
      { src: '/transitions/3after.jpeg', alt: 'Image 1' },
    ]

  },
  
];


export default function Gallery({ id, children = [], data, fixedHeight=true, maxColWidth=undefined, onScrollNext=()=>null } : 
  { id:string; children?: ReactNode[], data:any, fixedHeight?:boolean, maxColWidth?: number[] | undefined, onScrollNext?: Function }) {

    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(-1); // Track active item index
    const [contentWidth, setContentWidth] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);
    const [viewRlement, setViewElement] = useState<{id:string} | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const gridColumnMap = {
      XS: 0.3,
      S: 0.3,
      M: 0.5,
      L: 0.6,
      XL: 1
    };

    useEffect(() => {

      const updateWidth = () => {
        if (containerRef.current) {
          let contentWidth = containerRef.current.offsetWidth;
          if(contentWidth > 500) {
            contentWidth = (contentWidth*0.7);
            setItemWidth(contentWidth/2);
          } else {
            contentWidth = (contentWidth);
            setItemWidth(contentWidth);
          }
          setContentWidth(contentWidth);
        }
      };

      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);

    }, []);



    const {scrollY} = useScroll();
    
    console.log(containerRef.current?.offsetTop ?? 0, (containerRef.current?.offsetTop ?? 0) + (containerRef.current?.offsetHeight ?? 0))

  return (
    <> 

    <div ref={containerRef} className={styles.gallaryContainer} id={id} data-track >
      {children.map((column, colIndex) => {
        const start = containerRef.current?.offsetTop??0;
        const end = start + (containerRef.current?.offsetHeight ?? 0);
        const parallaxY = useSpring(
          useTransform(scrollY, [start, end], [0, (colIndex+1) * 400]),
          {
            stiffness: 100,
            damping: 30,
            restDelta: 0.001,
          }
        );

        return (
          <motion.div
            key={colIndex}
            className={styles.gallaryColumn}
            style={{ y: parallaxY, maxWidth: maxColWidth ? maxColWidth[colIndex] : 800 }}
          >
            {column}
          </motion.div>
        );
      })}
      
    </div>
    
    <div className='cloud' style={{ width:'100vw', height:'100vh', margin:'-24%', zIndex:0 }}></div>
    <h3 style={{ width:'100%', textAlign:'center', zIndex: 1000, position: 'relative', marginBottom:'10rem' }}>iste viral degisimim</h3>

    </>
  );
}

