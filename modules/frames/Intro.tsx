'use client'
import Image from 'next/image';
import styles from './frames.module.css';
import Arrow from '../icons/Arrow';
import { motion } from 'framer-motion';
import Text from '../components/Text';

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

export default function IntroFrame() {
  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", paddingTop: "20vh" }}>
        
        <motion.div viewport={{amount:"all"}} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:2}} exit={{opacity:0, transition:{duration:3}}} className={styles.picture}>
          <Image src="/manindark.jpg" height={500} width={500} alt="duha bum in dark"/>
        </motion.div>
        
        <motion.div variants={container} initial="hidden" whileInView="visible" className={styles.title}> <Text text='Kendini Yeniden İnşa Et'/> <Arrow /></motion.div>
    </div>
  );
}
