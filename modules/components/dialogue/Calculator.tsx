import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './dialogue.module.css'; 
import Display from './Display';
import PickNumber from './PickNumber';
import Control from './Control';
import Text from '../Text';


interface Value {
  val: number;
  unit: string;
  label: string;
  range?: [number, number];
  step?: number;
}

interface CalculatorProps {  
  display?: { val: number; label: string; unit: string; };
  Description?: string;
  Values: Value[];
  calculate?: (values: number[]) => number;
  setObject: (param: any, direction: number) => void;
}

export default function Calculator({ display, Description, Values, calculate, setObject }: CalculatorProps) {

  const [displayVal, setDisplay] = useState<number>(display?.val ?? 0);
  const [description, setDescription] = useState<string>(Description ?? "");
  const [values, setValues] = useState<Value[]>(Values);

  const container = {
    hidden: { opacity: 1, scale: 0 },
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
    hidden: { opacity: 0, scale: 0.7 },
    visible: {opacity: 1,scale: 1}
  };

  useEffect(() => {
    if (calculate) {
      const result = calculate(values.map(obj => obj.val));
      setDisplay(result);
    }
  }, [values, calculate]);

  useEffect(() => {
    setValues(Values);
  }, [Values]);

  useEffect(() => {
    setDescription(Description ?? "");
  }, [Description]);

  const turnPage = (direction: number) => {
    setObject(values, direction);
  };

  const handleChange = (index: number, newValue: number) => {
    setValues(prevValues => {
      const newValues = [...prevValues];
      newValues[index].val = newValue;
      return newValues;
    });
  };

  return (
    <>
      <div className={styles.container} style={{ paddingBottom: '60px' }}>

        <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{duration:1}} className={styles.CalculatorTop}>
          {display && <Display value={displayVal} label={display.label} unit={display.unit} />}
          {description && <div className={styles.CalculatorText}><Text text={description} /></div>}
        </motion.div>

        <motion.div
          variants={container}
          style={{ display: 'flex', flexDirection: 'column', padding: '0px 2rem', gap: '0.7em', width: '100%' }}
          initial="hidden"
          animate="visible"
        >
          {values.map((obj, i) => (
            <motion.div key={i} className="item" variants={item}>
              <PickNumber key={i+"picknumber"}
                value={obj.val}
                label={obj.label}
                unit={obj.unit}
                range={obj.range}
                step={obj.step??1}
                onChange={(val: number) => handleChange(i, val)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Control turnPage={turnPage} />
    </>
  );
}