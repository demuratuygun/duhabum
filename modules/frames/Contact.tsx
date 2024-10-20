'use client'
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { adsense_v1_4 } from 'googleapis';
import SocialMedia from '../components/Social';
import { useEffect, useState } from 'react';
import styles from './frames.module.css';
import Arrow from '../icons/Arrow';
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


export default function ContactFrame() {

  const [x, setX] = useState(300);
  const [dragged, setDragged] = useState(false);

  return (
    <div className='select-none' style={{ position: "relative", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "100%", height: "100vh", paddingTop: "7vh" }}>

        <Image draggable="false" style={{ paddingTop: '50px' }} src="/backindark2.png" layout="fill" objectFit="contain" alt="duha bum in dark"/>
        
        <div className='hideingRound' style={{right: '0rem', filter: "blur(5px)"}}></div>
        <div className='hideingRound' style={{left: '0rem', background: 'radial-gradient(circle at 0%, #000, #0000 50%)', filter: "blur(5px)"}}></div>

        <motion.div drag="x" initial={{ x }} onDrag={()=> setDragged(true)} dragConstraints={{ left: -660, right: 660 }} style={{ zIndex:900, x, transition: dragged?'':'1s ease' }}>
          <motion.div className={'flex flex-row m-2 pb-8 z-50 h-max noSelect'} >  
            {[{name: "Efe Ö.", rate: 5, comment:'Bizzat Duha benimle ilgilendi ve birkaç kez telefondan bile konuştuk.'},
            {name: "Baran K.", rate: 5, comment:'Eğer programa gerçekten sadık kalırsanız değişmeme ihtimali yok. Ben 2 ayda 5 kg verdim.'},
            {name: "Emirhan Ö.", rate: 4, comment:'Programım ve beslenme planım gerçekten işe yaradı. Mesajlaşmalar biraz daha hızlı olursa çok daha iyi olabilir'},
            {name: "Deniz B.", rate: 5, comment:"Daha önce aldığım eğitimlerde influencer yerine onun çalışanları ile konuşuyordum. Burada bizzat Duha'nın benimle ilgilenmesi beni çok mutlu etti."},
            {name: "Mert B.", rate: 5, comment:'Çoğu yer iade yapmazken Duha direkt iademi gerçekleştirdi, teşekkür ederim!'},
          ].map( (comment, i) => 
            <motion.div key={'comment='+i} variants={item} style={{ display: "flex", flexDirection: "column", justifyContent:'center', margin: "1rem", minWidth: "18rem", padding: "2.2rem 2rem" }} className='box'>                
                <div style={{ fontSize:'1rem', fontWeight: 300,color: '#B7FE04',letterSpacing:"0.1rem" }}>üyemiz</div> 
                <div className='text' style={{ fontSize: "1.5rem", fontWeight: 500, position:'relative', top:-4 }}> {comment.name} </div>
                <div className='text' style={{ fontSize: "1rem", opacity: 0.7 }}> {comment.comment} </div>
                <div style={{margin:"0.4rem 0rem", letterSpacing: '1px'}}>{Array.from(Array(comment.rate).keys()).map(()=>"★")}<span style={{opacity:0.4}}>{Array.from(Array(5-comment.rate).keys()).map(()=>"★")}</span></div>
            </motion.div>
            )}
            </motion.div>
        </motion.div>

        {dragged?null:<div className={styles.nextComment} onClick={() => setX(prevX => prevX - 250)}><ArrowUp color='#222'/></div>}
        {dragged?null:<div className={styles.nextComment} style={{backgroundColor:"#222", bottom: '40%', left: '4%', rotate:'225deg'}} onClick={() => setX(prevX => prevX + 250)}><ArrowUp color='#eee'/></div>}


        <motion.div variants={container} initial="hidden" whileInView="visible" className={styles.social}>
            <SocialMedia />
        </motion.div>
        
    </div>
  );
}
