'use client'
import Image from 'next/image';
import styles from './frames.module.css';
import Text from './../components/Text'
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function TransitionFrame() {

  const [width, setWidth] = useState(2000);
  
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.67, 0.87], [-300, 300]);
  const opacity = useTransform(scrollYProgress, [0.66, 0.78, 0.87], [0, 1, 0]);


  useEffect(() => {
    setWidth(0);
  })

  return (
    <div id="transitionsId" style={{ position: "relative", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", paddingTop: "20vh" }}>

        <Image draggable="false" className={styles.picture3} src="/snapindark.png" layout="fill" objectFit="contain" alt="duha bum in dark"/>
        <div className={styles.title} style={{fontSize: '3rem', position: 'relative', top: 0, left: 0, maxWidth: "none"}}>
            <Text text="6 aylik degisim" />
        </div>

        <div style={{ display: "flex", flexDirection: "row", margin: "4%", zIndex: 500 }}>
            {[1,2,1].map( i => 
            <motion.div style={{ x, opacity, display: "flex", flexDirection: "row", margin: "8px", width:"max-content" }}>
                <Image draggable="false" style={{ margin: "7px" }} src={"/transitions/"+i+"before.png"} height={7} width={110} alt="duha bum in dark"/>
                <Image draggable="false" style={{ margin: "7px" }} src={"/transitions/"+i+"after.png"} height={7} width={110} alt="duha bum in dark"/>
            </motion.div>
            )}
        </div>
        
        
    </div>
  );
}
