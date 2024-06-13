import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from './component.module.css'


type textProps= {text:string, speed?:number} 

export default function Text({text, speed=0.03}:textProps) {

    const [letters, setLetters] = useState( text.split("") );

    const container = {
      hidden: {y:-30, opacity:0},
      visible: {y:0, opacity:1, 
          transition: {
              type: "tween",
              delayChildren: 0.2,
              staggerChildren: speed
            }
      },
  }
  
  const item = {
      hidden: {  opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }

    useEffect(() => {
      setLetters( text.split(""));
    }, [text]);

    return (
      <motion.div 
        variants={container} 
        initial="hidden" 
        whileInView="visible" 
        className="noSelect"
        style={{ width:'100%', zIndex: 900 }}>
        {letters.map((letter, index) => (
          <motion.span 
            key={index}
            variants={item}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    );
  }
  

