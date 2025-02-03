'use client';

import { useState, ReactNode, ReactElement, useEffect } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';

export default function Slider({ children, initalIndex=0, slideWidth=300, pagerRadius=6 }: 
    { children: ReactNode[], 
        initalIndex?:number, 
        slideWidth?: number,
        pagerRadius?: number
    }) {

        

    const [activeIndex, setActiveIndex] = useState(initalIndex-1); // Track active slide index
    const x = useMotionValue(-(initalIndex-1) * slideWidth + children.length *slideWidth/2 - slideWidth/2); // Track x position of the slider



    // Function to handle pager clicks
    const handlePagerClick = (index: number) => {
        setActiveIndex(index); // Update active index
        console.log(index * slideWidth)
        //x.set(-index * slideWidth + children.length *slideWidth/2 - slideWidth/2); // Move slider to the corresponding slide
        animate(x, -index * slideWidth + children.length *slideWidth/2 - slideWidth/2, { type: 'spring', stiffness: 300, damping: 30 }); // Animate to the nearest slide
    };

    const handleDragEnd = () => {
        const currentX = x.get(); // Get current x position
        const newIndex = Math.round((-currentX + children.length/2*slideWidth) / slideWidth); // Calculate nearest slide index
        console.log(currentX, (-currentX + children.length/2*slideWidth))
        setActiveIndex(newIndex); // Update active index
      };
    
  return (
    <div aria-label="Draggable Image Slider">
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          width: 'fit-content',
          cursor: 'grab',
          x,
        }}
        drag="x" // Enable horizontal dragging
        //dragConstraints={{ left: -(children.length - 1) * slideWidth, right: 0 }} // Constrain dragging
        dragElastic={0.1} // Reduce elastic effect to make it stay where dragged
        dragMomentum={false} // Disable momentum to prevent sliding after release
        whileTap={{ cursor: 'grabbing' }} // Change cursor on drag
        onDragEnd={handleDragEnd}
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
            style={{ flexShrink: 0 }} // Ensure each child doesn't shrink
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index / 2, duration: 2 }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>

      {/* Pager */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>

        {children.map((child, index) => 
          Math.abs(activeIndex-index)<pagerRadius ?
            (<div
            key={index}
            onClick={() => handlePagerClick(index)} // Handle pager click
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width: '32px',
                height: '32px',
                margin: '0 5px',
                color: activeIndex === index ? '#fff' : '#fff4', // Highlight active pager
                cursor: 'pointer',
              //backgroundImage: `url(${(child as ReactElement).props?.src})`,
            }}
            aria-label={`Go to slide ${index + 1}`}
          >{index+1}</div>)
          :Math.abs(activeIndex-index)<pagerRadius+3 ?
            (<div key={index} style={{color:'#fff4', cursor: 'pointer'}} onClick={() => handlePagerClick(index)}>.</div>)
          :null
        )}
      </motion.div>
    </div>
  );
}

