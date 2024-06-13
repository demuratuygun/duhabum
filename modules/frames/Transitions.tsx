'use client'
import Image from 'next/image';
import styles from './frames.module.css';
import Text from './../components/Text'
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import ArrowUp from '../icons/ArrowUp';



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



export default function Transition() {

  const [width, setWidth] = useState(2000);
  
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.3, 0.5], [280, -280]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 1, 0]);


  useEffect(() => {
    setWidth(0);
  })

  return (
    <div id="transitionsId" style={{ position: "relative", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>

        <Image draggable="false" className={styles.picture3} src="/snapindark.png" layout="fill" objectFit="contain" alt="duha bum in dark"/>
        <div style={{ display: "flex", flexDirection: "row", margin: "4%", zIndex: 500 }}>
          {[1,2,1].map( i => 
            <motion.div style={{ x, opacity, display: "flex", flexDirection: "row", margin: "8px", width:"max-content" }}>
              <Image draggable="false" style={{ margin: "7px" }} src={"/transitions/"+i+"after.png"} height={7} width={110} alt="duha bum in dark"/>
              <Image draggable="false" style={{ margin: "7px" }} src={"/transitions/"+i+"before.png"} height={7} width={110} alt="duha bum in dark"/>
            </motion.div>
          )}
        </div>

        <motion.div className={styles.paragraph} variants={item} >
          3 aylık veya daha uzun bir programa kayıt olun. Antrenman, beslenme ve kardiyo planının en az %85'ini uygulayın. Değişim görmezseniz paranız iade!
          <a href="/article/IadePolitikamiz"
            className='noSelect icons' 
            style={{ width: "100%", paddingTop: '4%', display:"flex", flexDirection:"row", justifyContent:"start" }}>
            <div style={{ fontSize: "1em", fontWeight: 400, lineHeight:"2em", color: '#727272' }}> IADE POLITIKAMIZ </div>
            <div style={{ padding: '0.5em 0.4em' }}><ArrowUp /></div> 
          </a>
        </motion.div>        
        
    </div>
  );
}
