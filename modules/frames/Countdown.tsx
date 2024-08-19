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
  isStudent?:boolean
}

export default function Countdown({close}: {close: Function}) {

  const [counter, setCounter] = useState(0);
  const [isStudent, setIsStudent] = useState(false);
  const [data, setData] = useState<datatype>({});
  const [inputState, setInputState] = useState<string>("student");//email
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    let code = localStorage.getItem("code");
    if(code) close();
    countdown();

    const handleKeydownWrapper = (e: KeyboardEvent) => setFocus(true);
    window.addEventListener('keydown', handleKeydownWrapper);
    return () => {
      window.removeEventListener('keydown', handleKeydownWrapper);
    };

  }, []);

  const countdown = () => {
    
    let now = new Date();
    let midnight = new Date(2024, 7, 21, 0, 0, 0, 0);
    let count = Math.floor( (midnight.getTime() - now.getTime()) / 1000);
    
    if (count > 0) {
      setTimeout(() => {
        setCounter(count);
        countdown();
      }, 1000);
    } else {
      setCounter(0);
    }
  };

  const onChange = (value:string) => {
    setData(prevData => {
      let d:datatype = {...prevData};
      if(inputState=="email") d["email"] = value;
      return d;
    })
  }


  async function saveEmail(send:any) {

    const response = await fetch('/api/saveEmail', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(send)
    });

  }

  const handleEmailClick = () => {

    let regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
    if( regex.test( data["email"]??"" ) ) 
    setInputState("student");

  }

  const handleSaveClick = (isStudent:boolean) => {

    setInputState("code");
    saveEmail({...data, isStudent: isStudent});
    setIsStudent(isStudent);
    
    let code = isStudent? 'VIP720': 'VIP620';
    localStorage.setItem("code", code);
    CopyText(code);


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

      <div className={styles.emailFrame} onClick={() => setFocus(false)} style={{overflow:'scroll'}}>
        
        <div style={{ position: "absolute", top:'1rem', right: '1rem', zIndex:998 }} onClick={() => close()}>
          <Cancel/>
        </div>

        <div style={{ position:"absolute", background: "#000 url('emailPromo.jpg') no-repeat 100%/100%", top:0, left:0, width: '100%', height:'100%', zIndex:10, opacity:0.7, filter:"blur(2px)", backgroundPosition:'center',  }}></div>
      
        <div style={{ position: 'absolute', display: "flex", justifyContent: "center", alignItems: "center", flexDirection:'column', width: "100%", height: "100%", zIndex:500, paddingTop:"2rem" }}>

          <div style={{ width: "100%", maxWidth: "700px", textAlign:"center", display: 'flex', justifyContent:'center', flexDirection:"column", color: '#fff', fontWeight: 400, fontSize:"1.1rem" }}>                
            <div className={styles.stopwatch}>
              {inputState=="code"||inputState=="student"?<Text text={ inputState=="code"? (isStudent?"VIP720":"VIP620"): (Math.floor(counter/3600)+'').padStart(2, '0')+":"+(Math.floor(counter/60)%60+"").padStart(2, '0')+":"+(counter%60+"").padStart(2, '0') }/>:null}
            </div>

            <div style={{ background: "radial-gradient(#000, #0000 80%)", width: "100%", padding:'2rem' }}>
              <div>
                  {inputState=="student"? "Tüm üyelerimize tüm paketlerde geçerli": inputState=="code"? "kodun kopyalandı!" :null}
              </div>
                    
              <div className={styles.countdownPromotion} >  
                {inputState=="student"? "%30 İNDİRİM":null}
              </div>

              <div style={{ fontSize: inputState=="code"? "1.5rem" : '' }}>
                {inputState=="code"? "72 saat geçerli indirim kodunu ödeme sayfasında “İndirim kodu” Kısmına yazabilirsiniz":
                inputState=="student"? "%20 VIP + %10 EK ÖĞRENCİ İNDİRİMİNDEN YARARLAN":
                "%20 VIP + %10 EK ÖĞRENCİ İNDİRİMİ"}
              </div>
            </div>

          </div>

          <div style={{ width:"100%" }}>

          { inputState=="code"?null: inputState=="student"?
            <div style={{ width: '100%',  display:'flex', justifyContent:'center', fontSize:"2rem" }}>
              <div className={styles.countdownWrap} style={{ fontSize: '1.5rem', width:"100%", display:'flex', justifyContent:"center", alignItems:"center", gap:"1rem" }}>
                <button key="yes" onClick={() => handleSaveClick(true)} > ÖĞRENCİYİM </button>
                <button key="no" onClick={() => handleSaveClick(false)} > SADEEC VIP </button>
              </div>
            </div>
                  :
            <div style={{ width: '100%', display:'flex', justifyContent:'center', fontSize:"2rem" }}>
              <div className={styles.countdownWrap}>
                <TextEnter key={inputState} focus={focus} examples={["e posta"]} border onChange={onChange} />
                <button key="next" onClick={() => handleEmailClick()} className={styles.countdownButton}>→</button>
              </div>
            </div>
                  
          }
          </div>
                
        </div>
      
      </div>
    </div>
  );
}


