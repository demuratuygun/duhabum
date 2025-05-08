'use client';

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import styles from '../../components/dialogue/dialogue.module.css';
import Text from '../../components/Text'; 
import { useTrackElement, useTrackingContext } from '@/context/TrackingContext';
import { useEngages } from '@/context/EngageContext';


interface InputProps {
  id: string;
  verify?: string;
  question?: string;
  examples: string[];
  long?: boolean;
  onChange?: Function;
  onBlur?: Function;
  onFocus?: Function;
  focus?: boolean;
  caret?: boolean;
  Value?: string;
  border?: boolean;
  explanation?: string;
  type?: string;
  required?: boolean
}

export default function Input({ id, verify, Value, examples, type='', long=false, caret=true, onChange=()=>null, onBlur=()=>null, onFocus=()=>null, focus=false, border=false, explanation, required=false }: InputProps ) {

    const [value, setValue] = useState(Value??"");
    const [unverifyed, setUnverifyed] = useState(false);
    
    const [example, setExample] = useState(0);
    const [isFocus, setIsFocus] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { onEvent, logEvent, getEvent, isReady } = useEngages();
    const { viewEvent, scrollDirection } = useTrackElement(id);
      
    useEffect(() => {
      if( isReady && getEvent?.(id)?.val ) 
        setValue( getEvent?.(id)?.val ?? '');
    }, [isReady]);

    const regex = new RegExp(verify??"", "iu");
    useEffect( () => {
      if( viewEvent=="onLeave" && value.length>0 ) {
        logEvent?.({ name:'FormInput', ui:'input', id, act:'leave', val:value, verified: regex.test( value.trim()??"" ) });
        if( scrollDirection=='down' && !regex.test( value.trim()??"" ) && required ) {
          setValue("");
          setUnverifyed(true);
          doFocus();
        }
      }
    }, [viewEvent]);

    useEffect( () => {
      const giveExample = (set:number) => {
        setExample(set);
        setTimeout( () => giveExample((set+1)%examples.length), examples[set].length*200+3000 );
      }
      giveExample(0);
    }, []);
    
    const doFocus = () => {
      let ref = long? textareaRef: inputRef;
      if( ref ) {
        ref.current?.focus();
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    const handleChange = (e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if(long && textareaRef.current) {
        let reduce = 0
        if(textareaRef.current.scrollHeight == textareaRef.current.clientHeight) reduce = 16;
        textareaRef.current.style.height = textareaRef.current.scrollHeight-reduce+'px';
      }
      
      let d = { ui:'input', id, act:'change', val:e.target.value, verified: regex.test( e.target.value.trim()??"" ) };
      console.log(d)
      onEvent?.(d);

      if( type == 'phone' ) {
        let phone = e.target.value.replace(/\D/g,'');
        onChange(phone);
        setValue(phone);
        return;
      } else {
        onChange(e.target.value);
        setValue(e.target.value);
      }

    }

    return (
        <div 
          className={styles.TextEnterContainer} 
          style={{ borderRadius:'1rem' }} 
        >
            { type=='long'?
              <textarea id={id} data-track className='bum' style={{ width:'100%', zIndex:1000, textAlign: value.length>0?'left':'left', border: border?'#003862 solid 1px':'#fff1 solid 1px', }} 
                placeholder={ examples[0]}
                onFocus={() => {setIsFocus(true); onFocus()}}
                onBlur={() => {
                  setIsFocus(false); onBlur();
                  logEvent?.({ name:'FormInput', ui:'input', id, act:'leave', val:value, verified: regex.test( value.trim()??"" ) });}}
                onChange={handleChange}
                value={value} ref={textareaRef}
              />
              :
              <input id={id} data-track
                className='bum' 
                style={{ width:'100%', zIndex:1000, textAlign: value.length>0?'left':'left', border: border?'#003862 solid 1px':'#fff1 solid 1px' }}
                placeholder={ examples[0]}
                onFocus={() => {setIsFocus(true); onFocus();}} 
                onBlur={() => {
                  setIsFocus(false); onBlur();
                  logEvent?.({ name:'FormInput', ui:'input', id, act:'leave', val:value, verified: regex.test( value.trim()??"" ) });}} 
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

            { isFocus && unverifyed && explanation &&
              <div style={{ 
                fontSize:'0.9rem', 
                fontWeight: 200, 
                paddingTop:'0.5rem',
                paddingBottom:'0.7rem',
                color: '#999', 
              }}>
                { explanation }
              </div>
            }

        </div>
  );
}