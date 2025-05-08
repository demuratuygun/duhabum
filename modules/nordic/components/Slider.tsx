'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';

interface SliderProps {
  id: string;
  children: React.ReactNode[];
  data?: any[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
  showPager?: boolean;
  className?: string;
}

export default function ModernSlider({
  id,
  children,
  data,
  autoSlide = true,
  autoSlideInterval = 6000,
  showPager = true,
  className = '',
}: SliderProps) {

  
  const containerRef = useRef<HTMLDivElement>(null);
  const pagerRef = useRef<HTMLDivElement>(null);
  const slideWidthRef = useRef(0);
  const pagerItemRef = useRef<HTMLDivElement[]>([]);
  const totalSlides = children.length;

  const [fullView, setFullView] = useState<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false); // Track if the user is dragging

  const x = useMotionValue(0);
  const controls = useAnimation();
  const pagerControls = useAnimation();

  const pagerSize = window.screen.width>668? 24: 32;

  useEffect(() => {
    const slideWidth = slideWidthRef.current;
    const draggedSlides = Math.round(-x.get() / slideWidth);
    const nextIndex = Math.min(Math.max(draggedSlides, 0), totalSlides - 1);
    setHoverIndex(nextIndex);
  }, [x]);

  // Set slide width initially
  useEffect(() => {
    if (containerRef.current?.firstChild instanceof HTMLElement) {
      slideWidthRef.current = containerRef.current.firstChild.offsetWidth;
      controls.start({
        x: -activeIndex * slideWidthRef.current,
        transition: { duration: 0.6 },
      });
    }
  }, [children]);

  // Auto slide
  useEffect(() => {
    if (!autoSlide || isDragging) return; // Pause auto-slide if dragging

    const unsubscribe = x.on("change", (latestX) => {
      const slideWidth = slideWidthRef.current;
      const index = Math.round(-latestX / slideWidth);
      const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
      setHoverIndex(clampedIndex);
    });

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % totalSlides;
      setActiveIndex(nextIndex);
    }, autoSlideInterval);

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [activeIndex, autoSlide, autoSlideInterval, totalSlides, isDragging]); // Depend on isDragging

  // Slide content moves left-aligned
  useEffect(() => {
    controls.start({
      x: -activeIndex * slideWidthRef.current,
      transition: { duration: 0.6 },
    });
  }, [activeIndex]);

  // Pager scroll centers active item
  useEffect(() => {
    if (!pagerRef.current || !pagerItemRef.current[activeIndex]) return;

    const container = pagerRef.current;
    const activeItem = pagerItemRef.current[activeIndex];

    const containerWidth = container.offsetWidth;
    const itemLeft = activeItem.offsetLeft;
    const itemWidth = activeItem.offsetWidth;

    const scrollTo = itemLeft - containerWidth / 2 + itemWidth / 2;

    pagerControls.start({
      x: scrollTo > 0 ? -scrollTo : 12,
      transition: { duration: 0.6 },
    });
  }, [activeIndex]);

  const handleDragStart = () => {
    setIsDragging(true); // Set dragging to true when the user starts dragging
  };

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const slideWidth = slideWidthRef.current;
    const draggedSlides = Math.round(-x.get() / slideWidth);
    const nextIndex = Math.min(Math.max(draggedSlides, 0), totalSlides - 1);
    setActiveIndex(nextIndex);
    setIsDragging(false); // Set dragging to false when the user ends dragging
  };

  return (//marginLeft:'-46%'

    <div id={id} style={{paddingBottom:'5rem'}} className={`relative overflow-hidden ${className}`}>

      {fullView !== null && (
        <div className='noSelect' onClick={(e)=> (e.target === e.currentTarget)?setFullView(null):null} style={{ position:'fixed', width: '100vw', height:'100vh', top:0, left:0, backgroundColor:'#1118', zIndex:1000, }}> 
          <div style={{ margin:'auto', maxWidth:'55vh', width:'100%', height:'100%' }}>{children[fullView]}</div>
          
          <div style={{ position:'absolute', left:'3vw', top:'3vw', width:60, height:60, backgroundColor:'#ddd', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'1px 2px 0px 0px' }}
            onClick={() => setFullView(null)} >✖</div>
          <div style={{ position:'absolute', left:'3vw', top:'50%', width:60, height:60, backgroundColor:'#ddd', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'1px 2px 0px 0px' }}
            onClick={() => setFullView(prevFullView => (prevFullView !== null && prevFullView > 0) ? prevFullView - 1 : prevFullView)} >◀</div>
          <div style={{ position:'absolute', right:'3vw', top:'50%', width:60, height:60, backgroundColor:'#ddd', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', padding:'2px 0px 0px 2px' }}
            onClick={() => setFullView(prevFullView => (prevFullView !== null && prevFullView < children.length - 1) ? prevFullView + 1 : prevFullView)}>▶</div>
        </div>
      )}



      {/* Slider */}
      <motion.div
        ref={containerRef}
        className="flex"
        drag="x"
        dragElastic={0.1}
        dragConstraints={{ left: -slideWidthRef.current * (totalSlides - 1), right: 0 }}
        style={{ x, }}
        animate={controls}
        onDragStart={handleDragStart} // Start tracking drag
        onDragEnd={handleDragEnd}     // End tracking drag
      >
        {children.map((child, i) => (
          <div key={i} onClick={() => setFullView(i)} className="flex flex-col items-center justify-center"
            style={{ minWidth:'min(90vw, 420px)', minHeight:'min(90vw, 420px)', margin:0, padding:5 }}>
            {child}
          </div>
        ))}
      </motion.div>



      {/* Pager */}
      {showPager && (
          <motion.div
            ref={pagerRef}
            drag="x"
            dragConstraints={{ left: -totalSlides * (pagerSize + 6) / 2, right: totalSlides * (pagerSize + 6) / 2 }} // arbitrary scroll range
            dragElastic={0.1}
            animate={pagerControls}
            style={{ gap: 6, marginTop:'3%', display: 'flex', flexDirection:'row' }}
          >
            {children.map((_, index) => {
              return (
                <motion.div
                  key={index}
                  ref={(el) => {
                    if (el) pagerItemRef.current[index] = el;
                  }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(-1)}
                  onClick={() => setActiveIndex(index)}
                  animate={{
                    transition: {
                      opacity: { duration: 4.5 },
                      scaleY: { duration: 0.9 },
                    },
                  }}
                  style={{
                    width: pagerSize,
                    height: pagerSize,
                    borderRadius: pagerSize>24? 12: 9,
                    backgroundColor: 'var(--primary-color)',
                    cursor: 'pointer',
                    flex: '0 0 auto',
                    opacity: activeIndex === index ? 1 : 0.2,
                    transition: 'opacity 5s ease',
                  }}
                />
              );
            })}
          </motion.div>
      )}
    </div>
  );
}
