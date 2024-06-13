import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './dialogue.module.css';
import Control from './Control';
import Text from '../Text'; 


interface CalculatorProps {  
  question?: string;
  options: string[];
  setObject: (param: any, direction: number) => void;
  usekey: string;
  defaultValue?: string;
}

export default function Select({ question, options, setObject, usekey, defaultValue }: CalculatorProps) {

  const [description, setDescription] = useState<string>(question ?? "");
  const [value, setValue] = useState(defaultValue??"");

  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: description ? description.length / 30 : 0.2,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: -20, opacity: 0, scale: 0.7 },
    visible: { y: 0, opacity: 1, scale: 1 }
  };

  useEffect(() => {
    setValue(defaultValue??"");
  }, [defaultValue])

  useEffect(() => {
    setDescription(question ?? "");
  }, [question]);

  const turnPage = (direction: number) => {
    let d:{[key:string]:string} = {};
    d[usekey] = value;
    console.log( d)
    setObject(d, direction);
  };

  const handleClick = (selected: string) => {
    if( selected == value ) setValue("");
    else setValue(selected);
  };

  return (
    <>
      <div className={styles.container} style={{ paddingBottom: '60px' }}>
        <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{duration:1}} className={styles.CalculatorTop}>
          {description && <div className={styles.CalculatorText}><Text text={description} /></div>}
        </motion.div>

        <motion.div
          variants={container}
          style={{ display: 'flex', flexDirection: 'column', padding: 0, gap: '0.7em', width: '100%' }}
          initial="hidden"
          animate="visible"
        >
          {options.map((obj, i) => (
            <motion.div key={i} 
              className={styles.select} 
              variants={item} 
              onClick={()=>handleClick(obj)} 
              style={obj==value? {color: "#fff", fontWeight: 400}:{}}
            >
              {obj}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Control turnPage={turnPage} />
    </>
  );
}