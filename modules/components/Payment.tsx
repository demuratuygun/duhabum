'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Control from './dialogue/Control';
import CreditCard from './dialogue/CreditCard';


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

export default function Payment({ data, name, setObject}:{ data:checkoutType, name:string, setObject:(param: any, direction: number) => void }) {


    const turnPage = (direction: number) => {
        setObject( {checkout: {}}, direction);

    };

    const monthlyPayment = Math.round(data.promotions.reduce((a,b)=>a*(100-b.rate)/100, data.option.price)*data.installmentRate/data.installment)

    return (
        <>

        <div style={{ maxWidth: "100vw", padding: "4%", display: 'flex', flexDirection: "column", gap: 15, paddingBottom:'7rem' }}>
            <div style={{ width: "100%", fontSize:"3rem", fontWeight:300 ,display: "flex", justifyContent:'space-between', alignItems:"baseline", padding: "1rem" }} className="text"> 
                <div style={{ opacity:0.5 }} className="text noSelect">{monthlyPayment} ₺ x {data.installment} ay</div>
                <div>{monthlyPayment*data.installment}<span style={{fontWeight:300, paddingLeft:7}}>₺</span></div>
            </div>
            <CreditCard name={name??""}/>
        </div>
    
        <Control turnPage={(dir) => turnPage(dir)} />
     
        </>
      );
    }