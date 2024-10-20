'use client'
import Image from 'next/image';
import styles from './frames.module.css';
import Arrow from '../icons/Arrow';
import Text from '../components/Text';
import { motion } from 'framer-motion';
import ArrowUp from '../icons/ArrowUp';
import TextEnter from '../components/dialogue/TextEnter';
import { useState } from 'react';


const container = {
  hidden: { 
      opacity: 0, y: "-100%",
      transition: {
          type: "tween",
          delayChildren: 5,
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

  const [active, setAcitve] = useState(-1);
  const FAQ = [
    { q:'Programı aldıktan sonra iade etme seçeneğiniz var mı?', a:'Evet, iade etme seçeneğiniz var. İstediğiniz zaman iade talebinde bulunabilirsiniz. Daha fazla bilgi için garantı polıtıkamızı inceleyin.'},
    { q:'Programı aldıktan sonra dondurma seçeneğim var mı?', a: 'Evet, programınızı bir defaya mahsus olmak üzere 1 ay süreyle dondurabilirsiniz.' },
    { q:'Eğer değişim görmezsem paramın tamamı iade edilecek mi?', a:'Evet, 3 aylık ve üzeri programlardan birini aldıysanız ve programa %80 oranında uyduğunuz halde herhangi bir değişim görmezseniz, paranız iade edilecektir.'},
    { q:'Antrenman ve beslenme programı nasıl hazırlanıyor?', a:'Size 20 soruluk bir anket gönderiyoruz ve bu ankete göre kişiselleştirilmiş beslenme ve antrenman programı hazırlıyoruz.' }
  
  ];

  return (
    <div style={{ position: 'relative', display: "flex", justifyContent: "center", alignItems: "center",width: "100vw",  padding: "0px", margin: "0px", }}>

        <motion.div viewport={{amount:"all"}} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:3}} exit={{opacity:0}} className={styles.picture2}>
          <Image src="/faceindark2.png" layout="fill" objectFit="cover" alt="duha bum face in dark"/>
        </motion.div>

        <motion.div style={{ zIndex:900,  }}>
          <div style={{ fontSize:'1rem', fontWeight: 250, color: '#B7FE04', letterSpacing:"0.1rem", paddingLeft:'1.2rem' }}>SIKÇA SORULAN SORULAR</div> 

            <motion.div variants={container} className={'flex flex-col m-2 pb-8 z-50 h-max noSelect'} style={{maxWidth: 750}}>  
              {FAQ.map( (qa, i) => 
              <motion.div key={'comment='+i} onClick={() => setAcitve(i)} variants={item} style={{ display: "flex", flexDirection: "column", justifyContent:'center', margin: "1rem", minWidth: "18rem", padding: "2.2rem 2rem" }} className='box'>                
                  <div className='text' style={{ fontSize: "1.45rem", fontWeight: 500, position:'relative', top:-4, lineHeight:'1.7rem' }}> {qa.q} </div>
                  {active==i && <div className='text' style={{ fontSize: "1.2rem", opacity: 0.7, paddingTop:'0.7rem' }}> {qa.a} </div>}
              </motion.div>
              )}
            </motion.div>
        </motion.div>
          
    </div>
  );
}
