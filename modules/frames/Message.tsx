'use client'
import Image from 'next/image';
import styles from './frames.module.css';
import Arrow from '../icons/Arrow';
import Text from '../components/Text';
import { motion } from 'framer-motion';
import ArrowUp from '../icons/ArrowUp';
import TextEnter from '../components/dialogue/TextEnter';


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

export default function MessageFrame() {
  return (
    <div style={{ position: 'relative', display: "flex", justifyContent: "center", alignItems: "center",width: "100vw", height: "100vh",  padding: "0px", margin: "0px",overflow: 'clip'  }}>

        

        <motion.div viewport={{amount:"all"}} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:3}} exit={{opacity:0}} className={styles.picture2}>
          <Image src="/faceindark.jpeg" layout="fill" objectFit="cover" alt="duha bum face in dark"/>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="visible"  className={styles.title}> 
          
          <Text text="%15 ogrenci indirimi" />
          
          <motion.div className={styles.description} variants={item}>
              Bu indirimden yararlanmak için, öğrenci belgenizi göndermeniz gerekmektedir.
              <div className='noSelect icons' style={{ width: "100%", paddingTop: '4%', display:"flex", flexDirection:"row", justifyContent:"start" }}>
                <ArrowUp /> <div style={{ fontSize: "1.7rem", fontWeight: 400,  }}> INCELE </div>
              </div>
            </motion.div>
        
        </motion.div>
      
    </div>
  );
}
