
'use client'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './dialogue.module.css';



export default function PickNumber({value, onChange, label, unit, range, step=1}:{value:number|any, onChange:Function, label:string, unit:string, step?:number, range?:number[] }) {
    
    const [number, setNumber] = useState(value);
    const [numberValid, setNumberValid] = useState(!range || (range[0] <= value && value <= range[1]));
    const isHolding = useRef(0);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

      let numaral = e.target.value;
      if(range && (numaral.length> (range[1]+"").length )) return;
      
      let num = numaral.length==0? 0: parseInt(numaral)??0;
      setNumber(num);
      setNumberValid(!range || (range[0] <= num && num <= range[1]));

    };

    const handleBlur = () => {

        setNumberValid(true);
        if (range && range[0] > number ) setNumber( range[0]);
        else if (range && range[1] < number ) setNumber( range[1]);

    }
    
    function sleep(ms:number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const sum = useCallback( async(sign:number) => {
       
      setNumber((prevNumber:number) => {
        const newNumber = prevNumber + (sign * step);
        setNumberValid(true);
        if (range && range[0] > newNumber ) return range[0];
        else if (range && range[1] < newNumber ) return range[1];
        return newNumber;
      });

    }, [setNumber, range]);


    const onDown = useCallback( async(sign:number) => {

        const holdCount = isHolding.current;
        await sleep(1000);

        let iteration = 1;
        while( isHolding.current == holdCount ){
          
          sum(sign);
          await sleep( iteration<12? 600-(40*iteration):100 );

          if( iteration>99 ) onUp();
          iteration++;
      
        }
        
    }, [range, step, number])

    const onUp = useCallback(() => {
        isHolding.current=(isHolding.current+1)%1024;
    }, []);


    useEffect(() => {

      if (range && range[0] > number ) onChange(range[0]);
      else if (range && range[1] < number ) onChange(range[1]);
      else onChange(number);
    
    }, [number]);

    useEffect( () => setNumber(value), [value] )

    useEffect(() => {
      return () => {
          isHolding.current = 0;
      };
    }, []);


    return (
        
        <div className={styles.pickContainer} >

          <span style={{color: range==undefined||range[0]<number?'#ffffff3b':'#ffffff18'}}
            className={styles.pickSign} 
            onClick={() => sum(-1)}
            onTouchStart={() => onDown(-1)}
            onMouseDown={() => onDown(-1)} 
            onTouchEnd={onUp}
            onTouchCancel={onUp}
            onMouseUp={onUp}
            onMouseLeave={onUp}>
              -
          </span>

          <div>
            <span className={styles.pickLabel}>{label}</span>
            <input className={styles.pickNumber} value={number} onChange={handleChange} onBlur={handleBlur} style={{width: "calc("+ (""+number).length*0.7+"em + 5px )", color: numberValid?"#DFDFDF":"#f88" }}/>
            <span className={styles.pickUnit}>{unit}</span>
          </div>
              
          <span style={{color: range==undefined||number<range[1]?'#ffffff3b':'#ffffff18'}}
            className={styles.pickSign} 
            onClick={() => sum(1)}
            onTouchStart={() => onDown(1)} 
            onMouseDown={() => onDown(1)} 
            onTouchEnd={onUp} 
            onTouchCancel={onUp}
            onMouseUp={onUp}
            onMouseLeave={onUp}>
              +
          </span>
                
            
        </div>

    );
  }
  