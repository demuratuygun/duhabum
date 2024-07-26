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
    opacity: 1, y: 0,
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

export default function Countdown({close}: {close: Function}) {

  const [counter, setCounter] = useState(180);
  const [isStudent, setIsStudent] = useState(false);
  const [data, setData] = useState<datatype>({});
  const [inputState, setInputState] = useState<string>("email");
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    let code = localStorage.getItem("code");
    if(code) close();
    countdown(counter);

    const handleKeydownWrapper = (e: KeyboardEvent) => setFocus(true);
    window.addEventListener('keydown', handleKeydownWrapper);
    return () => {
      window.removeEventListener('keydown', handleKeydownWrapper);
    };

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
    else {
      setInputState("code")
    }

  }


  const CopyText = (TextToCopy: string) => {
    
    var TempText = document.createElement("input");
    TempText.value = TextToCopy;
    document.body.appendChild(TempText);
    TempText.select();
    
    document.execCommand("copy");
    document.body.removeChild(TempText);
    
  }

  return (
    <div style={{ position: "fixed", top:0, left:0, width:'100vw', height:'100vh', zIndex:1000, transition: '1s ease', overflow:'clip'}}>

      <div style={{ backgroundColor:'#0008', position:'absolute', top:0, left:0, width:'100vw', height:'100vh', zIndex:999, borderRadius:0, border:'none' }} onClick={() => close()}></div>

      <div className={styles.emailFrame} onClick={() => setFocus(false)}>
        
        <div style={{ position:"absolute", background: "#000 url('emailPromo.jpg') no-repeat 100%/100%", top:0, left:0, width: '100%', height:'100%', zIndex:10, opacity:0.7, filter:"blur(2px)", backgroundPosition:'center',  }}></div>
        <div style={{ position: "absolute", top:'1rem', right: '1rem', zIndex:998 }} onClick={() => close()}>
          <Cancel/>
        </div>
      
        <div style={{ position: 'absolute', display: "flex", justifyContent: "center", alignItems: "center", flexDirection:'column', width: "100%", height: "100%", zIndex:500 }}>

          <div style={{ width: "100%", maxWidth: "700px", textAlign:"center", display: 'flex', justifyContent:'center', flexDirection:"column", color: '#fff', fontWeight: 400, fontSize:"1.1rem" }}>
                
            <div className={styles.stopwatch}>
              {inputState=="code"||inputState=="email"?<Text text={ inputState=="code"? (isStudent?"VIP720":"VIP620"): "00:"+(Math.floor(counter/60)+"").padStart(2, '0')+":"+(counter%60+"").padStart(2, '0') }/>:null}
            </div>

            <div style={{ background: "radial-gradient(#000, #0000 80%)", width: "100%", padding:'2rem' }}>
              <div>
                  {inputState=="email"||inputState=="phone"? "İLK 20 ÜYEMİZE TÜM PAKETLERDE GEÇERLİ": inputState=="code"? "kodun kopyalandı!" :null}
              </div>
                    
              <div className={styles.countdownPromotion} >  
                {inputState=="email"||inputState=="phone"? "%35 İNDİRİM":null}
              </div>

              <div style={{ fontSize: inputState=="code"? "1.5rem" : '' }}>
                {inputState=="code"? "24 saat geçerli indirim kodunu ödeme sayfasından önce kullanabilirsin":
                inputState=="student"? "öğrenci olduğunu okul kartı belgesi veya üniversite e posta adresin ile kanıtlayabilir misin?":
                "%20 VIP %15 EK ÖĞRENCİ İNDİRİMİ"}
              </div>
            </div>

          </div>

          <div style={{ width:"100%" }}>

          { inputState=="code"?null: inputState=="student"?
            <div style={{ width: '100%',  display:'flex', justifyContent:'center', fontSize:"2rem" }}>
              <div className={styles.countdownWrap} style={{ fontSize: '1.5rem', width:"100%", display:'flex', justifyContent:"center", alignItems:"center", gap:"1rem" }}>
                <button key="yes" onClick={() => {setIsStudent(true);setInputState('code');localStorage.setItem("code", 'VIP720');CopyText('VIP720');}} > EVET </button>
                <button key="no" onClick={() => {setIsStudent(false);setInputState('code');localStorage.setItem("code", 'VIP620');CopyText('VIP620');}} > HAYIR </button>
              </div>
            </div>
                  :
            <div style={{ width: '100%', display:'flex', justifyContent:'center', fontSize:"2rem" }}>
              <div className={styles.countdownWrap}>
                <TextEnter key={inputState} focus={focus} examples={inputState=="email"? ["e posta", "isimsoyisim@gmail.com"]:["telefon numarasi", "0 5XX XXX XX XX"]} border onChange={onChange} />
                <button key="next" onClick={() => handleClick()} className={styles.countdownButton}>→</button>
              </div>
            </div>
                  
          }
          </div>
                
        </div>
      
      </div>
    </div>
  );
}


