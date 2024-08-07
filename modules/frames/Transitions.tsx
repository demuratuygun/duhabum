'use client';
import Image from 'next/image';
import styles from './frames.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ArrowUp from '../icons/ArrowUp';

const container = {
  hidden: { 
      opacity: 0, y: "-100%",
      transition: {
          type: "tween",
          delayChildren: 0.5,
          staggerChildren: 0.2
        }
  },
  visible: {
    opacity: 0.7, y: 0,
    transition: {
      type: "tween",
      delayChildren: 0.5,
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { y: 0, opacity: 0 },
  visible: { opacity: 1, transition: { delay: 1.2, duration: 1 } }
}

export default function Transition() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const { scrollY } = useScroll();

  // Update dimensions on mount and when window is resized
  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        setElementTop(ref.current.getBoundingClientRect().top + window.scrollY);
        setClientHeight(window.innerHeight);
        setWidth(window.innerWidth / 3);
      }
    };

    // Ensure this only runs on the client side
    if (typeof window !== 'undefined') {
      updateDimensions();
      window.addEventListener('resize', updateDimensions);

      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, [ref]);

  const x = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    [width*4, -width*4]
  );

  return (
    <div
      id="transitionsId"
      ref={ref}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Image
        draggable="false"
        className={styles.picture3}
        src="/snapindark.png"
        layout="fill"
        objectFit="contain"
        alt="duha bum in dark"
      />
      
      <motion.div drag="x" initial={{ x: 100 }} dragConstraints={{ left: -500, right: 500 }} style={{ zIndex:900, paddingBottom:"1.2rem" }}>
      <div style={{ display: 'flex', flexDirection: 'row', margin: 0, zIndex: 500 }}>
        {[1, 2, 3].map((i) => (
          <motion.div key={i} style={{ x, display: 'flex', flexDirection: 'row', margin: '0px 8px 20px 8px', width: 'max-content' }}
          >
            <Image
              draggable="false"
              style={{ margin: '7px', borderRadius:'1rem', filter:'grayscale(100%)' }}
              src={`/transitions/${i}before.jpeg`}
              height={265}
              width={200}
              alt="duha bum in dark"
            />
            <Image
              draggable="false"
              style={{ margin: '7px', borderRadius:'1rem' }}
              src={`/transitions/${i}after.jpeg`}
              height={265}
              width={200}
              alt="duha bum in dark"
            />
          </motion.div>
        ))}
      </div>
      </motion.div>
      
      <motion.div className={styles.paragraph} variants={item}>
        3 aylık veya daha uzun bir programa kayıt olun. Antrenman, beslenme ve kardiyo planının en az %80'ini uygulayın.
        Değişim görmezseniz paranız iade!
        <a
          href="/article/IadePolitikamiz"
          className="noSelect icons"
          style={{
            width: '100%',
            paddingTop: '4%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
          }}
        >
          <div style={{ fontSize: '1em', fontWeight: 400, color: '#B7FE04aa' }}>
            IADE POLITIKAMIZ
          </div>
          <div style={{ padding: '0.1em 0rem' }}>
            <ArrowUp />
          </div>
        </a>
      </motion.div>
    </div>
  );
}
