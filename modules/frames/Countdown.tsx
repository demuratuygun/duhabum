'use client'
import Image from 'next/image';
import styles from './frames.module.css';
import { motion } from 'framer-motion';
import Text from '../components/Text';
import TextEnter from '../components/dialogue/TextEnter';
import { useEffect, useState } from 'react';

const container = {
  hidden: { 
      opacity: 0, y: "-100%",
      transition: {
          type: "tween",
          delayChildren: 0.5,
          staggerChildren:0.2
        }
  },
  visible: {
    opacity: 0.7, y: 0,
    transition: {
      type: "tween",
          delayChildren: 0.5,
          staggerChildren:0.2
    }
  }
}

const item = {
  hidden: {  y: 0, opacity: 0 },
  visible: { opacity:1, transition:{ delay: 1.2, duration: 1 } }
}

export default function Countdown() {
  const [counter, setCounter] = useState(180);
  const [inputState, setInputState] = useState("email");

  const countdown = (count:number) => {
    if (count > 0) {
      setTimeout(() => {
        setCounter(count - 1);
        countdown(count - 1);
      }, 1000);
    } else {
      setCounter(0); // Ensure counter doesn't go below 0
    }
  };

  useEffect( () => {
    countdown(counter);
  }, [])

  const onChange = (value:string) => {

  }

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", paddingTop: "20vh" }}>
        
        <motion.div viewport={{amount:'some'}} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:2}} exit={{opacity:0, transition:{duration:3}}} className={styles.picture}>
          <Image className='noSelect' src="/duha2.png" height={800} width={610} alt="duha bum in dark"/>
        </motion.div>
        
        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="visible" 
          className={styles.countdown}
          style={{opacity:1, color: '#FFF'}}
        > 
            <Text text={ "00:"+(Math.floor(counter/60)+"").padStart(2, '0')+":"+(counter%60+"").padStart(2, '0')}/>

            <motion.div className={styles.description} variants={item} style={{ width: "100%", paddingTop: "4rem", textAlign:"center", display: 'flex', justifyContent:'center', flexDirection:"column", color: '#fff' }}>
              <div className={styles.countdownDescription}>
                Üye ol %20 VIP indiriminden ve ek %15 öğrenci indiriminden yararlan gelişmelerden haberdar ol
              </div>
              <div style={{ width: '100%', display:'flex', justifyContent:'center', fontSize:"2rem" }}>
                <div className={styles.countdownWrap}>
                  <TextEnter key={inputState} examples={inputState=="email"? ["e posta", "isimsoyisim@gmail.com"]:["telefon numarasi", "0 5XX XXX XX XX"]} border onChange={onChange} />
                  <button onClick={() => setInputState("phone")} className={styles.countdownButton}>→</button>
                </div>
              </div>
              
            </motion.div>
            
            
        </motion.div>
    </div>
  );
}


