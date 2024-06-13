'use client'
import Image from 'next/image';
import styles from './frames.module.css';
import Arrow from '../icons/Arrow';
import { motion } from 'framer-motion';
import Text from '../components/Text';
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

export default function IntroFrame() {
  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", paddingTop: "20vh" }}>
        
        <motion.div viewport={{amount:'some'}} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:2}} exit={{opacity:0, transition:{duration:3}}} className={styles.picture}>
          <Image src="/duha2.png" height={800} width={610} alt="duha bum in dark"/>
        </motion.div>
        
        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="visible" 
          className={styles.title}
        > 
            <Text text='%100 Değişim Garantisi'/>

            <motion.div className={styles.description} variants={item}>
              3 ay uzeri programımızda %85'ine uyun, değişim görmezseniz paranız iade!
              <div className='noSelect icons' style={{ width: "100%", paddingTop: '4%', display:"flex", flexDirection:"row", justifyContent:"start" }}>
                <ArrowUp /> <div style={{ fontSize: "1.7rem", fontWeight: 400,  }}> INCELE </div>
              </div>
            </motion.div>
            
            
        </motion.div>
    </div>
  );
}


