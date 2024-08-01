'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './dialogue.module.css';
import Control from './Control';
import Text from '../Text'; 
import TextEnter from './TextEnter';
import PickNumber from './PickNumber';
import Promotioins from '../../../content/promotions.json';

interface discount {
    name: string,
    rate: number
}

interface packagetype {
    plan: string, 
    default:number, 
    prices: number[], 
    duration: number[], 
    unit:string  
}

interface checkoutType {
    code: string,
    promotions:discount[],
    plan: packagetype,
    option: {duration:number, price:number, plan: string}
}

const padNumber = (val: number) => {
    return (val+'').replace(/(\d)(?=(\d{3})+$)/g, '$1.');
  }



export default function Checkout({ data, setObject}:{ data:checkoutType, setObject:(param: any, direction: number) => void }) {
    
    const [discounts, setDiscounts] = useState<discount[]>([]);
    const [code, setCode] = useState("");
    const [focus, setFocus] = useState(false);
    const [explode, setExplode] = useState(false);
    const [discounted, setDiscounted] = useState(false);


    const turnPage = (direction: number) => {

        setObject( {code: code , discounts:discounts}, direction);

    };

    useEffect( () => {

        //let code = localStorage.getItem("code");
        //if(code) onChange(code);
        
        const handleKeydownWrapper = (e: KeyboardEvent) => setFocus(true);
        const handleClickWrapper = () => setFocus(false);
        window.addEventListener('keydown', handleKeydownWrapper);
        window.addEventListener('click', handleClickWrapper);

        return () => {
          window.removeEventListener('keydown', handleKeydownWrapper);
          window.removeEventListener('click', handleClickWrapper);
        };
    
      }, []);

    const onChange = (change:string) => {
    
        change = change.toUpperCase();
        for (const [key, value] of Object.entries(Promotioins.codes)) {
            if(change == key) {
                setDiscounted(true);
                //localStorage.setItem("code", key);
                setExplode(true);
                setTimeout(() => setExplode(false), 2000);
                setTimeout(() => setDiscounts(value), 800);
                break;
            }
        }
        setCode( change )
    }

    const amount = Math.floor(discounts.reduce((a,b)=>a*(100-b.rate)/100, data.option.price))

    return (
        <>

            { // explode effect 
                explode? <div style={{ zIndex:1000, position:"absolute", top: 0, background: "url('/dust.gif') no-repeat center fixed", backgroundSize:"cover", width: "100%", height: "100%" }}></div>
            :null}




            <div style={{ marginBottom: "2rem", width:"100%", lineHeight:"1.5rem", position:'relative', fontWeight: 300 }}>

                <div style={{ color:"#fffa", width: "100%", display: "flex", justifyContent:'space-between', padding: '0.9rem' }}>
                    <div className="text noSelect">{data.option.duration} aylık {data.option.plan} Plan </div>
                    <div style={{ color:"#fff", minWidth: '6rem', textAlign: "right" }} className="text noSelect">{padNumber(data.option.price)} ₺</div>
                </div>
                
                {discounts.map((promo,i) => 
                    {
                        const lastamount = Math.floor(discounts.slice(0, i).reduce((a,b)=>a*(100-b.rate)/100, data.option.price));
                        const amount = Math.floor(discounts.slice(0, i+1).reduce((a,b)=>a*(100-b.rate)/100, data.option.price));
                        return(
                    <div key={"promo"+i} style={{ color:"#fffa", width: "100%", display: "flex", justifyContent:'space-between', padding: '0.9rem' }}>
                        <div className="text noSelect">{`%${promo.rate} ${promo.name}`} </div>
                        <div style={{ color:'#B7FE04', minWidth: '6rem', textAlign: "right" }} className="text noSelect">- {padNumber(lastamount - amount)} ₺</div>
                    </div>
                    )}
                )
                }


                
                <div style={{ width: "100%", padding: 0, marginTop:'1rem', marginBottom: '1rem', borderTop:"#666 solid 1px" }}></div>
            


                <div style={{ color:'#666', width: "100%", display: "flex", justifyContent:'space-between', padding: '0 0.9rem', marginBottom:'0.4rem'  }}>
                    <div className="text noSelect">{data.option.duration} ay </div>
                    <div style={{ minWidth: '6rem', textAlign: "right" }} className="text noSelect">₺{padNumber(Math.floor(amount/data.option.duration))} / ay</div>
                </div>
            
            
                <div style={{ width: "100%", fontSize:"2rem", color:'#B7FE04', fontWeight:300 ,display: "flex", justifyContent:'space-between', padding: '0.9rem', paddingTop: "1.6rem" }} className="text"> 
                    <div style={{ color: "#fff5", fontSize: "2rem", fontWeight: 100 }}></div>
                    <div>{padNumber(amount)}<span style={{fontWeight:300, paddingLeft:7}}>₺</span></div>
                </div>
                
                {discounted? null:
                <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{duration:1}} 
                    style={{ width:"100%", textAlign:"center", padding:'3rem 0rem 0rem 0rem' }}>
                    <TextEnter caret={true}
                        Value={code}
                        focus={focus}
                        examples={['promosyon kodu']}
                        onChange={onChange}
                        border
                    />
                </motion.div>
                }
                
            </div>

    
            <Control turnPage={turnPage} />
     
        </>
      );
    }