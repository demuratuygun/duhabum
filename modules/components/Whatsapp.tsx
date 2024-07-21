'use client'
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from './component.module.css'
import TextEnter from "./dialogue/TextEnter";

const container = {
  hidden: {y:-30, opacity:0},
  visible: {y:0, opacity:1, 
    transition: {
      type: "tween",
      delayChildren: 0.2
    }
  },
}
  
const item = {
  hidden: {  opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function whatsapp({}) {

    const [textOpen, setTextOpen] = useState( false );
    const [Message, setMessage] = useState( "merhaba bilgi alabilir miyim" );

    //href={"https://wa.me/905425091632?text="+Message}

    return (
      <>
      { textOpen? 
        <div className='box' style={{width:'300px', zIndex:1000, position:'fixed', left: '2rem', bottom: '2rem'}}> 
          <TextEnter focus={false} 
              Value={""}
              verify={""} 
              examples={['bana istedigini sorabilirsin', 'bir merhaba de sana donelim']}
              caret long
              onChange={(change:string) => {
                console.log(change);
              }}
            />
            <div style={{position: 'absolute', bottom: '0.6rem', right:'0.6rem', backgroundColor:"#3DE581", padding:7, margin:3, display: 'flex', alignItems:"center", justifyContent:"center", borderRadius: 16, zIndex:1000 }}>
              <svg width={20} height={20} fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z"/></svg>
            </div>
        </div>
        :
        <div >
          <a id="whatsapp" href={"https://wa.me/905425091632?text="+Message} style={{ position: "fixed", left: '2rem', bottom: '2rem', zIndex:1000 }} >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M37.5895 6.39384C35.5555 4.35891 33.1392 2.74637 30.4795 1.64907C27.8199 0.55176 24.9694 -0.00864915 22.0923 0.000100905C10.0178 0.000100905 0.188571 9.78026 0.18366 21.8036C0.178319 25.6321 1.1875 29.3937 3.10848 32.7054L0 44L11.6138 40.9681C14.8286 42.7097 18.4273 43.6212 22.0834 43.6199H22.0923C34.1658 43.6199 43.994 33.8388 43.9999 21.8164C44.0072 18.9491 43.4443 16.109 42.3437 13.4613C41.2432 10.8136 39.6271 8.41115 37.5895 6.39384ZM22.0923 39.9398H22.0844C18.8251 39.9408 15.625 39.0685 12.8169 37.4138L12.152 37.0209L5.26035 38.8202L7.0999 32.1328L6.66678 31.4453C4.8443 28.5599 3.87872 25.2163 3.8824 21.8036C3.8824 11.8123 12.0548 3.68313 22.0992 3.68313C26.9175 3.67452 31.542 5.58017 34.9555 8.98091C38.3689 12.3817 40.2918 16.999 40.3012 21.8174C40.2973 31.8097 32.1288 39.9398 22.0923 39.9398ZM32.0797 26.3676C31.5326 26.0946 28.8386 24.7766 28.3397 24.5949C27.8408 24.4132 27.4725 24.3218 27.1081 24.8679C26.7437 25.414 25.6938 26.6358 25.3746 27.0041C25.0554 27.3724 24.7362 27.4126 24.1892 27.1396C23.6421 26.8666 21.8772 26.292 19.7862 24.4358C18.1588 22.991 17.0608 21.2075 16.7416 20.6624C16.4224 20.1173 16.7072 19.8217 16.9812 19.5506C17.2277 19.306 17.5283 18.9142 17.8023 18.596C18.0763 18.2777 18.1677 18.0499 18.3493 17.6865C18.531 17.3231 18.4407 17.0049 18.3042 16.7328C18.1677 16.4608 17.0726 13.7786 16.6168 12.6874C16.1719 11.6247 15.7211 11.7691 15.3852 11.7524C15.066 11.7367 14.6977 11.7328 14.3353 11.7328C14.0583 11.74 13.7857 11.8042 13.5346 11.9215C13.2835 12.0388 13.0592 12.2065 12.8759 12.4144C12.374 12.9604 10.9597 14.2804 10.9597 16.9597C10.9597 19.639 12.924 22.2318 13.1951 22.5952C13.4661 22.9586 17.0549 28.4616 22.546 30.8216C23.5657 31.2583 24.6075 31.6412 25.6673 31.9688C26.9784 32.3832 28.1717 32.3253 29.1146 32.1848C30.1665 32.0287 32.3557 30.8668 32.8104 29.594C33.2651 28.3211 33.2661 27.2309 33.1296 27.0041C32.9931 26.7772 32.6277 26.6397 32.0797 26.3676Z" fill="white"/>
            </svg>
          </a>
        </div>
      }
      </>
    );
  }
  

