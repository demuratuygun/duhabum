
'use client'
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import styles from './dialogue.module.css';

const container = {
    hidden: { 
        y: "-50%",
        opacity: 0,
        transition: {
            type: "tween",
            delayChildren: 0.1,
            staggerChildren:0.1
          }
    },
    visible: {
       y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delayChildren: 0.1,
        staggerChildren:0.1
      }
    }
  }
    
  const item = {
    hidden: {  y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

export default function PickNumber({value, onChange, label, unit, range, step=1}:{value:number|any, onChange:Function, label:string, unit:string, step?:number, range?:number[] }) {
    
    const [number, setNumber] = useState(value);

    const sum = (amount:number) => {
        if(range==undefined || ( range[0]<=number+amount && number+amount<=range[1] )) onChange(amount);
    }

    useEffect(()=> {
        setNumber(value);
    },[value])

    return (
        
        <div className={styles.pickContainer} >
            <div className={styles.pickInner}>
                <span className={styles.pickLabel}>{label}</span>
                <span className={styles.pickNumber}> {number} </span>
                <span className={styles.pickUnit}>{unit}</span>
            </div>
            <div className={styles.pickSign} onClick={()=> sum(step)}>+</div>
            <div style={{float: "left"}} className={styles.pickSign} onClick={()=> sum(-1*step)}>-</div>
        </div>

    );
  }
  