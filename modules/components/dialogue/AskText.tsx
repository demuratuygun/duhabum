import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './dialogue.module.css';
import Control from './Control';
import Text from '../Text'; 
import TextEnter from './TextEnter';


interface EntryType {
  key: string;
  example:string[];
  value?: string;
  verify: string
  long?:boolean;
}

interface CalculatorProps {  
  long?: boolean;
  question?: string;
  entries: EntryType[];
  setObject: (param: any, direction: number) => void;
}

export default function AskText({ question, entries, long=false, setObject }: CalculatorProps) {

  const [description, setDescription] = useState<string>(question ?? "");
  const [value, setValue] = useState<{[key:string]: string}>({});
  const [focus, setFocus] = useState(-1);
  const [track, setTrack] = useState(0);


  const handleKeydown = (e:KeyboardEvent) => {
    console.log(track);
    setFocus(track);
  }

  useEffect(() => {
    setValue( prevValue => {
      let val:{[key:string]: string} = {};
      entries.map( e => val[e.key] = e.value??"" )
      console.log(val)
      return val;
    } )
  }, [entries]);

  useEffect( () => {
    setDescription(question ?? "");
  }, [question]);

  useEffect(() => {
    const handleKeydownWrapper = (e: KeyboardEvent) => handleKeydown(e);
    window.addEventListener('keydown', handleKeydownWrapper);
    return () => {
      window.removeEventListener('keydown', handleKeydownWrapper);
    };
  }, [handleKeydown]);


  const turnPage = (direction: number) => {
    
    let unverifyed = -1;
    for( let i=0; i<entries.length; i++ ) {
      let regex = new RegExp(entries[i]['verify']);
      console.log(value, i);
      if( !regex.test( value[entries[i].key]??"" ) ) {
        unverifyed = i;
        break;
      }
    }

    if( direction==-1 || unverifyed==-1 ) {
      setObject( value, direction);
    } else {
      setTrack(unverifyed);
      setFocus(unverifyed);
    }
    
  };

  const moveTrack = (track:number) => {
    let on = -1;
    for( let i=0; i<entries.length; i++ ) {
      let idx = (i+track)%entries.length;
      let regex = new RegExp(entries[idx]['verify']);
      let entry = value[entries[idx].key]??"";
      if( !regex.test(entry) || entry.length==0 ) {
        on = idx;
        break;
      }
    }
    setTrack(on);
    setFocus(-1);
    return on;
  }


  return (
    <>
      <div className={styles.container} style={{ paddingBottom: '60px' }}>
        
        <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{duration:1}} className={styles.CalculatorTop}>
          {description && <div className={styles.CalculatorText}><Text text={description} /></div>}
        </motion.div>

        <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{duration:1, delay: description.length/30}} className={styles.container}>
          {entries.map( (entry, i) => 
            <TextEnter focus={focus==i} 
              Value={entry.value??""}
              keyword={entry.key} 
              verify={entry.verify} 
              examples={entry.example} 
              long={entry.long??false} 
              caret={track==i}
              onChange={(change:string) => {
                setValue( prevValue => {
                  let d: { [key: string]: string } = {...prevValue};
                  d[entry.key] = change;
                  if( change.length==0 ) setTrack(i);
                  return d;
                })
              }}
              onBlur={() => moveTrack(i) }
              onFocus={() => setTrack(i)}  
            />
            
          )}
        </motion.div>
      
      </div>

      <Control turnPage={turnPage} />
 
    </>
  );
}