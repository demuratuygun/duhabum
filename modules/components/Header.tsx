'use client'
import { useState } from 'react';
import Menu from '../icons/Menu'
import Cancel from '../icons/cancel';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const container = {
    hidden: { 
        y: "-50%",
        opacity: 0,
        transition: {
            type: "tween",
            delayChildren: 0.1,
            staggerChildren:0.1
          }
    },
    visible: {
       y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delayChildren: 0.1,
        staggerChildren:0.1
      }
    }
  }
    
  const item = {
    hidden: {  y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

export default function Header({}) {
    
    const [expanded, setExpended] = useState(false);
    
    const { scrollYProgress } = useScroll();
    const menuScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.87]);
    const menuOpaacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.66]);
    const menuy = useTransform(scrollYProgress, [0, 0.1], [20, 0]);

    const scrolltoFrame = (frameId:string) => {
      let element = document.getElementById(frameId);
      window.scrollTo({ top: element?.offsetTop??2000, behavior: "smooth" })
    }
    
    return (
        <>
        <motion.div style={{ scale:menuScale, opacity:menuOpaacity, y:menuy }} whileHover={{opacity:1}} variants={container} initial="hidden" animate="visible" className="headerLandscape noSelect">
            <motion.div onClick={()=> scrolltoFrame("pakagesId")} variants={item} className='sectionbutton' >Paketler</motion.div>
            <motion.div onClick={()=> scrolltoFrame("transitionsId")} variants={item} className='sectionbutton' >Garanti</motion.div>
            <motion.div onClick={()=> scrolltoFrame("processId")} variants={item} className='sectionbutton'>İşleyiş</motion.div>
        </motion.div>
        <div className="headerVertical noSelect">
            <div onClick={() => setExpended(true)}>
                <Menu/>
            </div>
            <AnimatePresence>
            {expanded?
            <div style={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0 }} onClick={() => setExpended(false)}>
            <motion.div className='headerMenu' variants={container} initial="hidden" animate="visible" exit="hidden">
                <div style={{ position: "absolute", top: '1.5vh', left: '1.5vh', opacity: 0.9 }}  onClick={() => setExpended(false)}>
                    <Cancel/>
                </div>
                <motion.div onClick={()=> scrolltoFrame("pakagesId")} variants={item}>Paketler</motion.div>
                <motion.div onClick={()=> scrolltoFrame("transitionsId")} variants={item}>Garanti</motion.div>
                <motion.div onClick={()=> scrolltoFrame("processId")} variants={item}>İşleyiş</motion.div>
            </motion.div>
            </div>:null}
            </AnimatePresence>
        </div>
        </>
    );
  }
  