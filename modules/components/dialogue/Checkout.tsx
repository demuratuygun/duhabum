'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './dialogue.module.css';
import Control from './Control';
import Text from '../Text'; 
import TextEnter from './TextEnter';
import PickNumber from './PickNumber';

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
    option: {duration:number, price:number, plan: string},
    installment: number,
    installmentRate: number
}

export default function Checkout({ data, setObject}:{ data:checkoutType, setObject:(param: any, direction: number) => void }) {
    
    const [date, setDate] = useState((new Date()).toLocaleString("tr-TR"));

    const countdown = () => {
        setTimeout(() => {
            setDate((new Date()).toLocaleString("tr-TR"));
            countdown();
        }, 1000);
      };

    useEffect(() => {
        console.log(data);
        countdown();
    }, [])

    const turnPage = (direction: number) => {



        setObject( {}, direction);

    };

    const monthlyPayment = Math.round(data.promotions.reduce((a,b)=>a*(100-b.rate)/100, data.option.price)*data.installmentRate/data.installment)

    return (
        <>

            <div style={{ marginBottom: "2rem", width:"100%", lineHeight:"1.5rem", position:'relative', fontWeight: 300 }}>

                <div style={{  width: "100%", color: "#fff8", padding:'0.9rem', paddingBottom: '1.8rem', fontSize: "1.9rem", fontWeight: 100, lineHeight:"2.3rem"}}>
                    {date}<br/>
                    <div style={{ color: "#fff8", fontSize: "2rem", fontWeight: 100 }}>{data.code??''}</div>
                </div>

                <div style={{ color:"#fffa", width: "100%", display: "flex", justifyContent:'space-between', padding: '0.9rem' }}>
                    <div className="text noSelect">{data.option.duration} aylık {data.option.plan} Plan </div>
                    <div style={{ color:"#fff", minWidth: '6rem', textAlign: "right" }} className="text noSelect">{data.option.price} ₺</div>
                </div>
                
                {data.promotions.map((promo,i) => 
                    {
                        const lastamount = Math.round(data.promotions.slice(0, i).reduce((a,b)=>a*(100-b.rate)/100, data.option.price));
                        const amount = Math.round(data.promotions.slice(0, i+1).reduce((a,b)=>a*(100-b.rate)/100, data.option.price));
                        return(
                    <div style={{ color:"#fffa", width: "100%", display: "flex", justifyContent:'space-between', padding: '0.9rem' }}>
                        <div className="text noSelect">{`%${promo.rate} ${promo.name}`} </div>
                        <div style={{ color:'#B7FE04', minWidth: '6rem', textAlign: "right" }} className="text noSelect">- {lastamount - amount} ₺</div>
                    </div>
                    )}
                )
                }

                { data.installment>1?
                    <div style={{ color:'#fffa', width: "100%", display: "flex", justifyContent:'space-between', padding: '0.9rem' }}>
                        <div className="text noSelect"> vade farkı </div>
                        <div style={{ color:'#FEBB04', minWidth: '6rem', textAlign: "right" }} className="text noSelect">+ {monthlyPayment*data.installment - Math.round(data.promotions.reduce((a,b)=>a*(100-b.rate)/100, data.option.price))} ₺</div>
                    </div> : null
                }
                
                <div style={{ color:'#fffa', width: "100%", display: "flex", justifyContent:'space-between', padding: '0.9rem', marginTop:'1rem', paddingTop: '2.7rem', borderTop:"#666 solid 1px"  }}>
                        <div className="text noSelect">{data.installment} taksitle </div>
                        <div style={{ minWidth: '6rem', textAlign: "right" }} className="text noSelect">aylik {monthlyPayment} ₺</div>
                    </div>
                <div style={{ width: "100%", fontSize:"2rem", fontWeight:300 ,display: "flex", justifyContent:'space-between', padding: '0.9rem', paddingTop: "1.6rem" }} className="text"> 
                    <div style={{ color: "#fff3", fontSize: "2rem", fontWeight: 100 }}>{''}</div>
                    <div>{monthlyPayment*data.installment}<span style={{fontWeight:500, paddingLeft:7}}>₺</span></div>
                </div>
                
            </div>

    
          <Control turnPage={turnPage} />
     
        </>
      );
    }