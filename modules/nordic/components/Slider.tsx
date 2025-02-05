'use client';

import { useState, ReactNode, ReactElement, useEffect, useRef } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';

export default function Slider({ children, initalIndex=0, slideWidth=300, style={} }: 
    { children: ReactNode[], 
        initalIndex?:number, 
        slideWidth?: number,
        pagerRadius?: number
        style?: any
    }) {
        
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(initalIndex-1); // Track active slide index

    useEffect(() => {
      setActiveIndex(initalIndex);
      if (containerRef.current) {
        const container = containerRef.current as HTMLDivElement;
        const child = container.children[initalIndex] as HTMLElement;
        
        if (child) {
          container.scrollTo({
            left: child.offsetLeft+child.clientWidth/2-container.clientWidth/2,  // Scroll to the child's horizontal position
            behavior: 'smooth'       // Optional: animate the scroll
          });
        }
      }
    }, [initalIndex]);
    

    // Function to handle pager clicks
    const handlePagerClick = (index: number) => {
        console.log(index)
        setActiveIndex(index); // Update active index
        if (containerRef.current) {
          const container = containerRef.current as HTMLDivElement;
          const child = container.children[index] as HTMLElement;
          if (child) {
            child.scrollIntoView({
              behavior: 'smooth', // smooth scrolling
              block: 'nearest', 
              inline: 'center', // center the child element
            } as ScrollIntoViewOptions);
          }
        }
      };
    
  return (
    <div aria-label="Draggable Image Slider" 
      style={{ 
        margin: '0rem', 
        height: '80vh', 
        display:'flex', 
        flexDirection:'column', 
        justifyContent:'center', 
        alignItems:'center',
        ...style
      }}>
      <div
        
        ref={containerRef}
        className='noSelect'
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100vw',
          cursor: 'grab',
          scrollSnapType: 'x mandatory',
          overflowY: 'hidden',
          overflowX: 'scroll',
          padding: '0px 50%',
          scrollbarWidth: 'none'
        }}
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
            style={{ 
              scrollSnapAlign: 'center',
              width: 'fit-content',
             }}
            onPointerDown={()=> handlePagerClick(index)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index / 2, duration: 2 }}
          >
            {child}
          </motion.div>
        ))}
      </div>

      {/* Pager */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', zIndex:1000 }}>

        {children.map((child, index) => 
            <div key={index} onClick={() => handlePagerClick(index)} 
              style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '2rem',
                  height: '2rem',
                  margin: '5px',
                  borderRadius: '0.5rem',
                  color: activeIndex === index ? '#fff' : '#fff4', // Highlight active pager
                  background: activeIndex === index ? '#fff' :'#fff2',
                  cursor:'pointer'
                //backgroundImage: `url(${(child as ReactElement).props?.src})`,
              }}
          >
          </div>
        )}
      </motion.div>
    </div>
  );
}

