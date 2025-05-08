'use client';

import React, { useState, useEffect, useRef, useCallback, ReactNode, useContext } from 'react';
import styles from './nordic.module.css';
import { motion } from 'framer-motion';
import { useTrackElement, TrackingProvider } from '@/context/TrackingContext';
import { useEngages } from '@/context/EngageContext';
import { render } from '@/lib/render/render';
import { set } from 'react-ga';


const containerVariants = {
  hidden: { opacity: 0 }, // Ensures container is always visible
  show: { 
    opacity: 1, 
    transition: { 
      staggerdata: 0.3, // Each child fires after the previous one
      delaydata: 0,  // Delay before the first child starts
    } 
  }
};

const itemVariants = {
  hidden: { scale: 0, y: 50,  filter:'brightness(0%)' },
  show: { scale: 1, y: 0,  filter:'brightness(100%)', transition: { duration: 0.1, ease: "easeOut" } }
};

export default function Select({ options, id, question, verify={min:1, max:1}, style, required=false } : { options:{ text: string, component?: { text: string } }[], id:string, question:string, verify:{min?:number, max?:number}, style:any, required?:boolean }) {

  const max = verify.max || 1;
  const min = verify.min || 1;

  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const { onEvent, logEvent, getEvent, isReady } = useEngages();
  const { viewEvent, scrollDirection } = useTrackElement(id);
  
  useEffect(() => {
    if( isReady ) setSelected(getEvent?.(id)?.val ?? []);
  }, [isReady])

  useEffect( () => {
    if( viewEvent=="onLeave" ) {
      logEvent?.({name:'FormInput', ui:'select', id, act:'leave', val:selected, verified: selected.length <= max && selected.length >= min  });
      if( scrollDirection=='down' && selected.length < min && required )
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [viewEvent]);

  return (
    <motion.div 
      id={id} 
      data-track 
      ref={ref} 
      className={styles.pickContainer}
      style={{backgroundColor:'#0000', flexDirection:'column', padding:0, ...style}}
      variants={containerVariants} 
      initial="hidden" 
      animate="show"
    >
        
        <motion.p variants={itemVariants} className='nordic' style={{ textAlign:'left'}}>{question}</motion.p>

        { options.map( (child, i) => 
          <motion.div variants={itemVariants} 
            key={i} style={ selected.includes(options[i].text) ?
            { padding: '2rem 1rem', border: '1px solid #fff4', backgroundColor: '#444', color:'#fff' }
           :{ border: '1px solid #fff0', }
          }
            className={styles.pickerOption+" noSelect"}
            onClick={ () => setSelected( prev => {
              let selcted = options[i]?.component?.text || options[i]?.text;
              console.log(selcted);
              
              let set = [...prev, selcted]; 
              let act = 'select';
              if( prev.includes(selcted) ) {
                set = prev.filter( p => p != selcted);
                act = 'deselect'; 
              }
              else if( prev.length >= max ) {
                set = [...prev.slice(1), selcted];
                act = 'dropselect';
              }
              onEvent?.({name:'FormInput', ui:'select', id, act, val:set, verified: set.length <= max && set.length >= min });
              logEvent?.({name:'FormInput', ui:'select', id, act:'leave', val:set, verified: set.length <= max && set.length >= min });

              return set;
            } ) }
          >
              {child.text}
          </motion.div>
        )}
    </motion.div>
  );
}