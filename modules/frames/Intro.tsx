'use client'
import Image from 'next/image';
import styles from './frames.module.css';
import Arrow from '../icons/Arrow';
import { motion } from 'framer-motion';
import Text from '../components/Text';
import ArrowUp from '../icons/ArrowUp';
import Countdown from './Countdown';
import { useState } from 'react';

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

export default function IntroFrame() {
  const [close, setClose] = useState(false);

  return (
    <>
    {close? null: <Countdown close={() => setClose(true)}/> }

    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", paddingTop: "20vh" }}>
        
        <motion.div viewport={{amount:'some'}} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:2}} exit={{opacity:0, transition:{duration:3}}} className={styles.picture}>
          <Image className='noSelect' src="/duha2.png" height={800} width={610} style={{zIndex:2}} alt="duha bum in dark"/>
        </motion.div>
        
        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="visible" 
          className={styles.title}
        > 
            <Text text='%100 Değişim Garantisi'/>

            <motion.div className={styles.description} variants={item}>
              3 ay boyunca programlarımızı en az %80'ine sadık kalarak uygulayın, değişim görmezseniz paranız iade!
       
              <a href="/article/IadePolitikamiz" className={styles.goto}>
                <div> INCELE </div>
                <ArrowUp color={"#fff"}/>
              </a>
            </motion.div>
            
            
        </motion.div>
    </div>
    </>
  );
}


