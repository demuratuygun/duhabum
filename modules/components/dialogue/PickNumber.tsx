'use client'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './dialogue.module.css';

type Range = number[] | { values: number[] };

export default function PickNumber({value, onChange, label, unit, range, step=1}:{value:number|any, onChange:Function, label:string, unit:string, step?:number, range?:Range }) {
    
    const [number, setNumber] = useState(value);
    const [numberValid, setNumberValid] = useState(validateNumber(value, range));
    const isHolding = useRef(0);

    function validateNumber(num: number, range?: Range) {
        if (!range) return true;
        if (Array.isArray(range)) {
            return range[0] <= num && num <= range[1];
        } else {
            return range.values.includes(num);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let numaral = e.target.value;
        let num = numaral.length === 0 ? 0 : parseInt(numaral) ?? 0;
        setNumber(num);
        setNumberValid(validateNumber(num, range));
    };

    const handleBlur = () => {
        setNumberValid(true);
        if (Array.isArray(range)) {
            if (range[0] > number) setNumber(range[0]);
            else if (range[1] < number) setNumber(range[1]);
        } else if (range && !range.values.includes(number)) {
            setNumber(range.values[0]);
        }
    }

    function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const sum = useCallback((sign:number) => {
        setNumber((prevNumber:number) => {
            let newNumber = prevNumber + (sign * step);
            if (Array.isArray(range)) {
                if (range[0] > newNumber) return range[0];
                if (range[1] < newNumber) return range[1];
            } else if (range) {
                const currentIndex = range.values.indexOf(prevNumber);
                const nextIndex = currentIndex + sign;
                if (nextIndex < 0) return range.values[0];
                if (nextIndex >= range.values.length) return range.values[range.values.length - 1];
                newNumber = range.values[nextIndex];
            }
            return newNumber;
        });
    }, [step, range]);

    const onDown = useCallback(async (sign:number) => {
        const holdCount = isHolding.current;
        await sleep(1000);

        let iteration = 1;
        while (isHolding.current === holdCount) {
            sum(sign);
            await sleep(iteration < 12 ? 600 - (40 * iteration) : 100);

            if (iteration > 99) onUp();
            iteration++;
        }
    }, [sum]);

    const onUp = useCallback(() => {
        isHolding.current = (isHolding.current + 1) % 1024;
    }, []);

    useEffect(() => {
        if (Array.isArray(range)) {
            if (range[0] > number) onChange(range[0]);
            else if (range[1] < number) onChange(range[1]);
            else onChange(number);
        } else if (range && !range.values.includes(number)) {
            onChange(range.values[0]);
        } else {
            onChange(number);
        }
    }, [number, range, onChange]);

    useEffect(() => {
        setNumber(value)
    }, [value]);

    useEffect(() => {
        return () => {
            isHolding.current = 0;
        };
    }, []);

    return (
        <div className={styles.pickContainer}>
            <span style={{color: (!range || (Array.isArray(range) && range[0] < number) || (range && !Array.isArray(range) && range.values[0] < number)) ? '#ffffff99' : '#ffffff11'}}
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
                <input className={styles.pickNumber} value={number} onChange={handleChange} onBlur={handleBlur} style={{width: `calc(${(""+number).length * 0.7}em + 5px )`, color: numberValid ? "#DFDFDF" : "#f88" }}/>
                <span className={styles.pickUnit}>{unit}</span>
            </div>
              
            <span style={{color: (!range || (Array.isArray(range) && number < range[1]) || (range && !Array.isArray(range) && number < range.values[range.values.length - 1])) ? '#ffffff99' : '#ffffff11'}}
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
