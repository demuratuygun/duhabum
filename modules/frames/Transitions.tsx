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

export default function Transition() {

  const ref = useRef<HTMLDivElement | null>(null);
  const [x, setX] = useState(1730);
  const [mobile, setMobile] = useState(true);
  const [dragged, setDragged] = useState(false);


  const durations = ['2 yıl sonra', '10 hafta sonra', '4 ay sonra', '5 ay sonra', '1 ay sonra', '2 ay sonra', '1 ay sonra'];

  useEffect(() => {
    if(window.innerWidth>500) {
      setMobile(false);
      setX(1490);
    }
  }, [])


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
      
      <motion.div drag="x" onDrag={()=> setDragged(true)}  dragConstraints={{ left: -1700, right: 1700 }} style={{ zIndex:900,  x, transition: dragged?'':'1s ease' }}>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 0, zIndex: 500 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.div key={i} style={{ position:'relative', display: 'flex', flexDirection: 'row', margin: '0px 8px 20px 8px', width: 'max-content' }}>
              <Image
                draggable="false"
                style={{ 
                  height: '320px',
                  width: '250px', 
                  margin: '7px', 
                  borderRadius:'1rem', 
                  filter:'grayscale(100%)',
                  objectFit: 'cover',
                  backgroundColor:'#272727'
                }}
                src={`/transitions/${i}before.jpeg`}
                height={640}
                width={500}
                alt="duhabum body transition before"
              />
              <Image
                draggable="false"
                style={{ 
                  height: '320px', 
                  width: '250px', 
                  margin: '7px', 
                  borderRadius:'1rem', 
                  objectFit: 'cover',
                  backgroundColor:'#272727'
                }}
                src={`/transitions/${i}after.jpeg`}
                height={640}
                width={500}
                alt="duhabum body transition after"
              />
              <div style={{position:'absolute', bottom:10, left: '52%', zIndex:1000, backgroundColor:"#C9C9C9", color: '#000', padding:'2px 10px', borderRadius: '10px'}}>{durations[i-1]}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {dragged?null:<div className={styles.nextComment} style={{ top: mobile?'25%':'35%' }} onClick={() => setX(prevX => prevX - 270)}><ArrowUp color='#222'/></div>}
      {dragged?null:<div className={styles.nextComment} style={{ backgroundColor:"#222", top: mobile?'25%':'35%', left: '4%', rotate:'225deg' }} onClick={() => setX(prevX => prevX + 270)}><ArrowUp color='#eee'/></div>}


      
      <motion.div className={styles.paragraph} initial={{ y: 60, opacity: 0 }} animate={{ y:mobile?-10:10, opacity: 1, transition: { delay: 1, duration: 2 }}}>
        3 aylık veya daha uzun bir programa kayıt olun. Antrenman, beslenme ve kardiyo planının en az %80'ini uygulayın.
        Değişim görmezseniz paranız iade!
        <a  
          href="/article/IadePolitikamiz#paragraph4"
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
            GARANTİ POLİTİKAMIZ
          </div>
          <div style={{ padding: '0.1em 0rem' }}>
            <ArrowUp />
          </div>
        </a>
      </motion.div>
    </div>
  );
}
