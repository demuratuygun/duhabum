'use client'
import Image from 'next/image';
import styles from './frames.module.css';
import Text from '../components/Text'
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import ArrowUp from '../icons/ArrowUp';
import SocialMedia from '../components/Social';



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



export default function Process() {


  return (
    <div id="processId" 
      style={{ 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
        position: "relative",
        width: "100vw", 
        height: "100vh",
      }}>

        <motion.div 
          className={styles.paragraph} 
          variants={item}>
          Programlarımızı oluştururken en son bilimsel araştırmaları ve fitness trendlerini takip ediyoruz. Eğitim ve beslenme konusundaki en güncel bilgileri sizlere sunarak, en etkili ve güvenli yöntemlerle çalışmanızı sağlıyoruz. 
          <a href='/article/Isleyis'
            className='noSelect icons' 
            style={{ width: "100%", paddingTop: '4%', display:"flex", flexDirection:"row", justifyContent:"start" }}>
            <div style={{ fontSize: "1em", fontWeight: 400, color: '#727272' }}> 
              DAHA FAZLA BILGI
            </div>
            <div style={{ padding: '0.1em 0rem' }}><ArrowUp /></div> 
          </a>
        </motion.div>
        
    </div>
  );
}
