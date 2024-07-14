'use client'
import Image from 'next/image';
import styles from './frames.module.css';
import { motion } from 'framer-motion';
import Text from '../components/Text';
import TextEnter from '../components/dialogue/TextEnter';
import { useEffect, useState } from 'react';
import Cancel from '../icons/cancel';

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

interface datatype {
  email?:string,
  phone?:string
}

export default function Countdown() {

  const [counter, setCounter] = useState(180);
  const [close, setClose] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [data, setData] = useState<datatype>({});
  const [inputState, setInputState] = useState<string>("email");


  useEffect(() => {
    let code = localStorage.getItem("code");
    if(code) setClose(true);
  }, []);

  const countdown = (count:number) => {
    if (count > 0) {
      setTimeout(() => {
        setCounter(count - 1);
        countdown(count - 1);
      }, 1000);
    } else {
      setCounter(0);
    }
  };

  useEffect( () => {
    countdown(counter);
  }, [])

  const onChange = (value:string) => {
    setData(prevData => {
      let d:datatype = {...prevData};
      if(inputState=="email") d["email"] = value;
      else if(inputState=="phone") d["phone"] = value;
      return d;
    })
  }

  const handleClick = () => {
    if (inputState=="email") {
      let regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
      if( regex.test( data["email"]??"" ) ) 
      setInputState("phone");
    }
    else if (inputState=="phone") {
      let regex = new RegExp('^\\d{10,}$');
      if( regex.test( data["phone"]??"" ) ) 
        setInputState("student");
    }
    else setInputState("code")

  }

  return (
    <div style={{ position: "fixed", top:0, left:0, width:'100vw', height:'100vw', display:close?'none':'block', zIndex:999, transition: '1s ease', overflow:'clip'}}>

    <div style={{ position:'absolute', top:0, left:0, width:'100vw', height:'100vw', backgroundColor: "#0009", zIndex:999, transition: '1s ease' }} onClick={()=>setClose(true)}></div>

    <div className={styles.emailFrame} >

      <div style={{ position: "absolute", top:'2rem', right: '2rem', zIndex:998 }} onClick={() => setClose(true)}>
        <Cancel/>     
      </div>
    
      <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", paddingTop: "20vh" }}>
        
        <motion.div viewport={{amount:'some'}} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:2}} exit={{opacity:0, transition:{duration:3}}} className={styles.picture}>
          <Image className='noSelect' src="/duha2.png" height={800} width={610} alt="duha bum in dark"/>
        </motion.div>
        
        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="visible" 
          className={styles.countdown}
          style={{opacity:1, color: '#FFF'}}
        > 
            <Text text={ inputState=="code"? (isStudent?"VIP720":"VIP620"): "00:"+(Math.floor(counter/60)+"").padStart(2, '0')+":"+(counter%60+"").padStart(2, '0')}/>

            <motion.div className={styles.description} variants={item} style={{ width: "100%", paddingTop: "4rem", textAlign:"center", display: 'flex', justifyContent:'center', flexDirection:"column", color: '#fff' }}>
             
              <div className={styles.countdownDescription}>
                {inputState=="code"? "24 saat geçerli indirim kodunu sana uygun paketi seçtikten hemen sonra taksitlendirme sayfasinda kullanabilirsin":
                inputState=="student"? "öğrenci olduğunu okul kartı belgesi veya üniversite e posta adresin ile kanıtlayabilir misin?":
                "Üye ol %20 VIP indiriminden ve ek %15 öğrenci indiriminden yararlan gelişmelerden haberdar ol"}
              </div>
              { inputState=="code"?null: inputState=="student"?
                <div style={{ width: '100%', display:'flex', justifyContent:'center', fontSize:"2rem" }}>
                  <div className={styles.countdownWrap} style={{ fontSize: '1.5rem', width:"100%", display:'flex', justifyContent:"center", gap:"1rem" }}>
                    <button onClick={() => {setIsStudent(true);setInputState('code');localStorage.setItem("code", 'VIP720');}} > EVET </button>
                    <button onClick={() => {setIsStudent(false);setInputState('code');localStorage.setItem("code", 'VIP620');}} > HAYIR </button>
                  </div>
                </div>
                :
                <div style={{ width: '100%', display:'flex', justifyContent:'center', fontSize:"2rem" }}>
                  <div className={styles.countdownWrap}>
                    <TextEnter key={inputState} examples={inputState=="email"? ["e posta", "isimsoyisim@gmail.com"]:["telefon numarasi", "0 5XX XXX XX XX"]} border onChange={onChange} />
                    <button onClick={() => handleClick()} className={styles.countdownButton}>→</button>
                  </div>
                </div>
                
              }
              
            </motion.div>
            
        </motion.div>
      </div>
    
    </div>
    </div>
  );
}


