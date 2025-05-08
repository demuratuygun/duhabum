import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
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


  useEffect( () => {
    const giveExample = (set:number) => {
      setExample(set);
      setTimeout( () => giveExample((set+1)%examples.length), examples[set].length*200+3000 );
    }
    giveExample(0);
  }, []);


  useEffect( () => {
    let ref = long? textareaRef: inputRef;
    if( focus ) ref.current?.focus();
  }, [focus])

  const handleChange = (e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(e.target.value);
    setValue(e.target.value);
  }

  return (
        <div className={styles.TextEnterContainer}>
            { long?
              <textarea className='bum' style={{ width:'100%', height: Math.max((value.length/12),6)+"em", zIndex:1000, textAlign: value.length>0?'center':'left' }} 
                placeholder={examples[0]}
                onFocus={() => {setIsFocus(true); onFocus()}}
                onBlur={() => {setIsFocus(false); onBlur();}}   
                onChange={handleChange}
                value={value} ref={textareaRef}
              />
              :
              <input 
                className='bum' 
                style={{ width:'100%', zIndex:1000, textAlign: value.length>0?'center':'left', border: border?'#003862 solid 1px':'#fff1 solid 1px' }}
                placeholder={examples[0]}
                onFocus={() => {setIsFocus(true);onFocus();}} 
                onBlur={() => {setIsFocus(false); onBlur();}} 
                onChange={handleChange}
                value={value} ref={inputRef}
              />
            }
            
            {
            value.length==0 && !isFocus && examples.map( 
                (opt, i) => i==example &&
                    <div key={'example'+i} className={styles.askTextExample} style={{zIndex:0,}}>
                        <Text text={examples[example]} speed={0.1}/>
                    </div>
                )
            }

            {!caret || (isFocus || value.length>0) ? null: <div className={styles.askTextCaret}></div>}

        </div>
  );
}