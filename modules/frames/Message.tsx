'use client'
import Image from 'next/image';
import styles from './frames.module.css';
import Arrow from '../icons/Arrow';
import Text from '../components/Text';
import { motion } from 'framer-motion';

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

export default function MessageFrame() {
  return (
    <div style={{ position: 'relative', display: "flex", justifyContent: "center", alignItems: "center",width: "100vw", height: "100vh",  padding: "0px", margin: "0px",overflow: 'clip'  }}>

        <motion.div viewport={{amount:"all"}} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:3}} exit={{opacity:0}} className={styles.picture2}>
          <Image src="/faceindark.jpeg" layout="fill" objectFit="cover" alt="duha bum face in dark"/>
        </motion.div>
        <motion.div variants={container} initial="hidden" whileInView="visible"  className={styles.title}> <Text text="hedefini belirle,
        basla" /><Arrow /> </motion.div>
      
    </div>
  );
}
