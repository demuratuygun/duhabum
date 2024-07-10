'use client'
import Image from 'next/image';
import { motion } from 'framer-motion';



const container = {
  hidden: { 
      y: "-50%",
      transition: {
          type: "tween",
          delayChildren: 0.5,
          staggerChildren:0.3
        }
  },
  visible: {
     y: 0,
    transition: {
      type: "tween",
      delayChildren: 0.5,
      staggerChildren:0.3
    }
  }
}
  
const item = {
  hidden: { y: -20, opacity: 0, filter: "blur(20px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)", transition:{duration: 1} }
}

export default function ContactFrame() {
  return (
    <div className='select-none' style={{ position: "relative", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "100%", height: "100vh", paddingTop: "7vh" }}>

        <Image draggable="false" style={{ paddingTop: '50px' }} src="/backindark.png" layout="fill" objectFit="contain" alt="duha bum in dark"/>

        <motion.div drag="x" dragConstraints={{ left: -300, right: 300 }} style={{ zIndex:900}}>
          <motion.div className={'flex flex-row m-2 pb-8 z-50 h-max noSelect'}>
            {[1,1,1].map( i => 
            <motion.div variants={item} style={{ display: "flex", flexDirection: "column", margin: "1rem", width: "250px", padding: "2.2rem 2rem" }} className='box'>
                <Image draggable="false" style={{ marginBottom: "1.5rem" }} src={"/profiles/"+i+".png"} height={96} width={96} alt="duha bum in dark"/>
                <div className='text' style={{ fontSize: "1.5rem", fontWeight: 500 }}> mehmet ozgor </div>
                <div className='text' style={{ fontSize: "1rem", opacity: 0.7 }}> bir ayda etkisini gosterdi harika tek kelimeyle </div>
            </motion.div>
            )}
            </motion.div>
        </motion.div>

        
        
        
    </div>
  );
}
