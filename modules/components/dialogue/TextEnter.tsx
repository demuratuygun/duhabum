import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import styles from './dialogue.module.css';
import Text from '../Text'; 


interface CalculatorProps {
  verify?: string;
  question?: string;
  examples: string[];
  long?: boolean;
  onChange: Function;
  onBlur?: Function;
  onFocus?: Function;
  focus?: boolean;
  caret?: boolean;
  Value?: string;
  border?: boolean;
}

export default function TextEnter({ verify, Value, examples, long=false, caret=true, onChange, onBlur=()=>null, onFocus=()=>null, focus=false, border=false }: CalculatorProps) {

  const [value, setValue] = useState(Value??"");
  const [example, setExample] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 0.6
      }
    }
  };

  const item = {
    hidden: { y: -20, opacity: 0, scale: 0.7 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1
    }
  };

  const giveExample = (set:number) => {
      setExample(set)
      setTimeout( () => giveExample((set+1)%examples.length), examples[set].length*200+3000 );
  }
  
  useEffect( () => {
    giveExample(0);
  }, [])

  useEffect( () => {
    let ref = long? textareaRef: inputRef;
    if( focus ) ref.current?.focus();
  }, [focus])

  const handleChange = (e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(e.target.value);
    setValue(e.target.value);
  }



  return (
        <motion.div 
          className={styles.TextEnterContainer}
          variants={container}
          initial="hidden"
          animate="visible"
        >
            { long?
              <textarea style={{ width:'100%', height: Math.max((value.length/12),6)+"em", zIndex:1000, position:"relative", textAlign: value.length>0?'center':'left', backgroundColor: '#4443' }} 
                placeholder={examples[0]}
                onFocus={() => {setIsFocus(true);onFocus()}} 
                onBlur={() => {setIsFocus(false); onBlur();}}   
                onChange={handleChange}
                value={value} ref={textareaRef} 
              />
              :
              <input style={{ width:'100%', zIndex:1000, position:"relative", textAlign: value.length>0?'center':'left',  padding: "0.8rem", border: border?'#888 solid 1px':'none', backgroundColor: '#4443' }}
                placeholder={examples[0]}
                onFocus={() => {setIsFocus(true);onFocus();}} 
                onBlur={() => {setIsFocus(false); onBlur();}} 
                onChange={handleChange}
                value={value} ref={inputRef}
              />
            }
            
            {
            value.length==0 && !isFocus? examples.map( 
                (opt, i) => i==example?
                    <div key={'example'+i} className={styles.askTextExample} style={{zIndex:0}}>
                        <Text text={examples[example]} speed={0.1}/>
                    </div>
                :null)
            :null
            }

            {!caret || (isFocus || value.length>0)?null:<div className={styles.askTextCaret}></div>}

        </motion.div>
  );
}