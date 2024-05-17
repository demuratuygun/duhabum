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

export default function Display({value, label, unit}:{value:number, label:string, unit:string}) {
    
    const [number, setNumber] = useState(value);

    useEffect(() => {
        setNumber(Math.floor(value))
    }, [value])

    return (
        
        <div className={styles.display}>
            <div className={styles.displayLabel}>{label}</div>
            <div className={styles.displayNumber}>{number}</div>
            <div className={styles.displayUnit}>{unit}</div>
        </div>

    );
  }
  