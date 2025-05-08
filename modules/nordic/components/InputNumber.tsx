'use client'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import style from './nordic.module.css';
import { useTrackElement } from '@/context/TrackingContext';
import { useEngages } from '@/context/EngageContext';


type Range = number[] | { values: number[] };

export default function InputNumber({ id, value, label, unit, range, step=1, required=false }:{ id:string, value:number|any, label:string, unit:string, step?:number, range?:Range, required?:boolean }) {
    
    const [number, setNumber] = useState(value);
    const [numberValid, setNumberValid] = useState(validateNumber(value, range));
    const isHolding = useRef(0);
    const ref = useRef<HTMLDivElement>(null);
    const [engaged, setEngaged] = useState(false);


    useEffect(()=> {
        if(engaged) onEvent?.({name:'FormInput', ui:'input', id, act:'leave', val:number, verified: numberValid&&engaged })
    }, [engaged])

    // Track view click resize
    const { onEvent, logEvent, getEvent, isReady } = useEngages();
    const { viewEvent, scrollDirection } = useTrackElement(id);


    useEffect(() => {
        if( isReady && getEvent?.(id)?.val) {
            let val = getEvent?.(id)?.val ?? value;
            console.log('InputNumber', id, val);
            handleChange({target:{value: val}} as ChangeEvent<HTMLInputElement>);
            setEngaged(true);
        }
    }, [isReady]);
    
        
    useEffect( () => {

        if( viewEvent=="onLeave" && number ) {
            logEvent?.({name:'FormInput', ui:'number', id, act:'leave', val:number, verified: numberValid&&engaged });
            if( ref && scrollDirection=='down' && !engaged && required  ) {
                ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
        
    }, [viewEvent]);

    function validateNumber(num: number, range?: Range) {
        if (!range) return true;
        if (Array.isArray(range)) {
            return range[0] <= num && num <= range[1];
        } else {
            return range.values.includes(num);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>, pushEngage:boolean=false) => {
        let numaral = e.target.value;
        let num = numaral.length === 0 ? 0 : parseInt(numaral) ?? 0;
        if( !Number.isNaN(num) ) setNumber(num);
        else return;

        let verified = validateNumber(num, range);
        setNumberValid(verified);
        if(pushEngage) onEvent?.({name:'FormInput', ui:'number', id, act:'change', val:num, verified:verified&&engaged })
    };

    const handleBlur = () => {
        setNumberValid(true);
        let val = undefined;
        if (Array.isArray(range)) {
            if (range[0] > number) val = (range[0]);
            else if (range[1] < number) val = (range[1]);
        } else if (range && !range.values.includes(number)) {
            val = (range.values[0]);
        }

        if( val ) {
            setNumber(val);
            logEvent?.({name:'FormInput', ui:'number', id, act:'leave', val:val, verified: numberValid&&engaged });

        }
    }

    function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const sum = useCallback((sign:number) => {
        setEngaged(true);
        setNumberValid(true);
        setNumber((prevNumber:number) => {
            let newNumber = prevNumber + (sign * step);
            if (Array.isArray(range)) {
                if (range[0] > newNumber) newNumber = range[0];
                if (range[1] < newNumber) newNumber = range[1];
            } else if (range) {
                const currentIndex = range.values.indexOf(prevNumber);
                const nextIndex = currentIndex + sign;
                if (nextIndex < 0) newNumber = range.values[0];
                if (nextIndex >= range.values.length) newNumber = range.values[range.values.length - 1];
                newNumber = range.values[nextIndex];
            }
            
            onEvent?.({name:'FormInput', ui:'number', id, act:sign>0?'increase':'decrease', val:newNumber, verified: validateNumber(newNumber, range) })
            return newNumber;
        });
    }, [step, range, setNumber, onEvent]);

    const onDown = useCallback(async (sign:number) => {
        const holdCount = isHolding.current;
        await sleep(500);

        let iteration = 1;
        while (isHolding.current === holdCount) {
            sum(sign);
            await sleep(iteration < 16 ? 400 - (16 * iteration) : 150);

            if (iteration > 99) onUp();
            iteration++;
        }
    }, [sum]);

    const onUp = useCallback(() => {
        isHolding.current = (isHolding.current + 1) % 1024;
    }, []);

    // useEffect(() => {
    //     if (Array.isArray(range)) {
    //         if (range[0] > number) onChange(range[0]);
    //         else if (range[1] < number) onChange(range[1]);
    //         else onChange(number);
    //     } else if (range && !range.values.includes(number)) {
    //         onChange(range.values[0]);
    //     } else {
    //         onChange(number);
    //     }
    // }, [number, range, onChange]);

    useEffect(() => {
        setNumber(value)
    }, [value]);

    useEffect(() => {
        return () => {
            isHolding.current = 0;
        };
    }, []);

    return (
        <div id={id} data-track className={style.pickContainer} ref={ref} onPointerDown={() => setEngaged(true)} >
            <span className={style.pickSign} style={{color: (!range || (Array.isArray(range) && range[0] < number) || (range && !Array.isArray(range) && range.values[0] < number)) ? '#222' : '#888'}}>
                -
            </span>

            <div>
                <span className={style.pickLabel}>{label}</span>
                <input className={style.pickNumber+" "+(engaged?'':style.blink)}
                    value={number} 
                    onChange={(e)=>handleChange(e,true)} 
                    onBlur={handleBlur} 
                    onFocus={(e) => setTimeout(() => e.target.select(), 300)}
                    style={{ width: `calc(${(""+number).length*1.1}rem + 8px )`, color: numberValid ? "#222" : "#f88", paddingRight:'3px' }}
                />
                <span className={style.pickUnit}>{unit}</span>
            </div>
              
            <span className={style.pickSign} style={{color: (!range || (Array.isArray(range) && number < range[1]) || (range && !Array.isArray(range) && number < range.values[range.values.length - 1])) ? '#222' : '#888'}}>
                +
            </span>

            { (!range || (Array.isArray(range) && range[0] < number) || (range && !Array.isArray(range) && range.values[0] < number)) ?
            <div style={{ left:'-1rem' }}
                className={style.numberHighlight+' LEFT_7fuy'} 
                onClick={() => sum(-1)}
                onPointerDown={(e) => {e.preventDefault();onDown(-1)}}
                onPointerUp={onUp}
                onPointerCancel={onUp}
                onPointerLeave={onUp}
            ></div>
            :null}

            { (!range || (Array.isArray(range) && number < range[1]) || (range && !Array.isArray(range) && number < range.values[range.values.length - 1])) ?
            <div style={{ right:'-1rem' }}
                className={style.numberHighlight+' RIGHT_7fuy'} 
                onClick={() => sum(1)}

                onPointerDown={(e) => {e.preventDefault();onDown(1)}}
                onPointerUp={onUp}
                onPointerCancel={onUp}
                onPointerLeave={onUp}
            ></div>
            :null}
        
        </div>
    );
}
