'use client';

import { useState, ReactNode, ReactElement, useEffect, useRef, RefObject, use, useLayoutEffect } from 'react';
import { animate, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import styles from './nordic.module.css';
import React from 'react';
import { get } from 'http';


interface ColumnType {
  images: {
    src: string;
    alt: string;
  }[],
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL'
}

const GalleryContent:ColumnType[] = [
  {
    size: 'L',
    images: [
      { src: '/transitions/1before.jpeg', alt: 'Image 1' },
      { src: '/transitions/1after.jpeg', alt: 'Image 1' },
      { src: '/transitions/2before.jpeg', alt: 'Image 1' },
      { src: '/transitions/2after.jpeg', alt: 'Image 2' },
      { src: '/transitions/3before.jpeg', alt: 'Image 1' },
      { src: '/transitions/3after.jpeg', alt: 'Image 1' },
    ]

  },
  {
    size: 'XS',
    images: [
      { src: '/transitions/4before.jpeg', alt: 'Image 1' },
      { src: '/transitions/4after.jpeg', alt: 'Image 2' },
      { src: '/transitions/5before.jpeg', alt: 'Image 1' },
      { src: '/transitions/5after.jpeg', alt: 'Image 1' },
      { src: '/transitions/6before.jpeg', alt: 'Image 1' },
      { src: '/transitions/6after.jpeg', alt: 'Image 2' },
    ]
  },
  {
    size: 'S',
    images: [
      { src: '/transitions/1before.jpeg', alt: 'Image 1' },
      { src: '/transitions/1after.jpeg', alt: 'Image 1' },
      { src: '/transitions/2before.jpeg', alt: 'Image 1' },
      { src: '/transitions/2after.jpeg', alt: 'Image 2' },
      { src: '/transitions/3before.jpeg', alt: 'Image 1' },
      { src: '/transitions/3after.jpeg', alt: 'Image 1' },
    ]

  },
  {
    size: 'L',
    images: [
      { src: '/transitions/4before.jpeg', alt: 'Image 1' },
      { src: '/transitions/4after.jpeg', alt: 'Image 2' },
      { src: '/transitions/5before.jpeg', alt: 'Image 1' },
      { src: '/transitions/5after.jpeg', alt: 'Image 1' },
      { src: '/transitions/6before.jpeg', alt: 'Image 1' },
      { src: '/transitions/6after.jpeg', alt: 'Image 2' },
    ]
  }
  
];


export default function Gallery({ children, fixedHeight=false, maxColHeight=undefined }: { children?: ReactNode[], fixedHeight?:boolean, maxColHeight?: number | undefined }) {

    const [activeIndex, setActiveIndex] = useState(-1); // Track active item index
    const [contentWidth, setContentWidth] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const gridColumnMap = {
      XS: 0.3,
      S: 0.4,
      M: 0.5,
      L: 0.6,
      XL: 1
    };

    useEffect(() => {

      const updateWidth = () => {
        if (containerRef.current) {
          let contentWidth = containerRef.current.offsetWidth;
          if(contentWidth > 500) {
            contentWidth = (contentWidth*0.8);
            setItemWidth(contentWidth/2);
          } else {
            contentWidth = (contentWidth);
            setItemWidth(contentWidth);
          }
          setContentWidth(contentWidth);
        }
      };

      let mainFrame = document.getElementById('mainFrame');
      mainFrame?.addEventListener('scroll', ()=> console.log('ff'));

      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);

    }, []);
    

    
    

  return (
      <div ref={containerRef}
        className={styles.gallaryContainer}
      >
        {GalleryContent.map((column, colIndex) => (
          <motion.div key={colIndex}
            animate={{ y: [50+colIndex*50, 0] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className={styles.gallaryColumn}
            style={{maxHeight: maxColHeight, }}
          >
            {column.images.map((image, index) => (
              <motion.div key={index} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index / 2 + colIndex/2, duration: 2 }}
                style={{ 
                  width: itemWidth * gridColumnMap[column.size??"M"]-20,
                  height: fixedHeight ? `250px` : 'auto',
                  margin: '10px',
                  borderRadius:'13px',
                  position: 'relative', 
                  overflow: 'hidden'
                }}>
                <img
                  draggable={false}
                  src={image.src}
                  alt={image.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
  );
}

