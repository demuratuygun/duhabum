'use client'
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { adsense_v1_4 } from 'googleapis';
import SocialMedia from '../components/Social';
import { useEffect, useState } from 'react';
import styles from './frames.module.css';


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


export default function ContactFrame() {

  const [width, setWidth] = useState(2000);
  
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.7, 0.9], [280, -280]);
  const opacity = useTransform(scrollYProgress, [0.66, 0.78, 0.87], [0, 1, 0]);


  useEffect(() => {
    setWidth(0);
  })

  
  return (
    <div className='select-none' style={{ position: "relative", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "100%", height: "100vh", paddingTop: "7vh" }}>

        <Image draggable="false" style={{ paddingTop: '50px' }} src="/backindark.png" layout="fill" objectFit="contain" alt="duha bum in dark"/>
        
        <div className='hideingRound' style={{right: '0rem', filter: "blur(5px)"}}></div>
        <div className='hideingRound' style={{left: '0rem', background: 'radial-gradient(circle at 0%, #000, #0000 50%)', filter: "blur(5px)"}}></div>

        <motion.div drag="x" initial={{ x: 300 }}  dragConstraints={{ left: -600, right: 600 }} style={{ zIndex:900}}>
          <motion.div className={'flex flex-row m-2 pb-8 z-50 h-max noSelect'} >  
            {[{rate: 5, comment:'bizzat duha benle ilgilendi ve birkac kez telefondan bile konustuk.'},
            {rate: 5, comment:'ben ne kadar programin ustine gidersem ayni sekilde benle ilgilendi. 3 ay daha uzatacagim programimi'},
            {rate: 4, comment:'programimi ve beslenme planim gercek ise yaradi. mesajlasmalar biraz daha hizli olursa cok daha iyi olabilir.'},
            {rate: 5, comment:'cogu yer iade yapmazken duha direk iademi gerceklestirdi tesekkur ederim!'},
            {rate: 5, comment:'daha once uzaktan egitim almistim ama aldigim infuluncer yerine onun calisanlari ile konsuyordum ama burda bizzat duhanin benle ilgilenmesi beni cok mutlu etti'},
          ].map( (comment, i) => 
            <motion.div variants={item} style={{ display: "flex", flexDirection: "column", justifyContent:'center', margin: "1rem", minWidth: "250px", padding: "2.2rem 2rem" }} className='box'>                
                <div style={{ fontSize:'1rem', fontWeight: 300,color: '#B7FE04',letterSpacing:"0.1rem" }}>üyemiz</div> 
                <div className='text' style={{ fontSize: "1.5rem", fontWeight: 500, position:'relative', top:-4 }}> mehmet ozgor </div>
                
                <div className='text' style={{ fontSize: "1rem", opacity: 0.7 }}> {comment.comment} </div>
                <div style={{margin:"0.4rem 0rem", letterSpacing: '1px'}}>{Array.from(Array(comment.rate).keys()).map(()=>"★")}<span style={{opacity:0.4}}>{Array.from(Array(5-comment.rate).keys()).map(()=>"★")}</span></div>

            </motion.div>
            )}
            </motion.div>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="visible" className={styles.social}>
            <SocialMedia />
        </motion.div>
        
    </div>
  );
}
