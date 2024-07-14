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
    
    const [discounts, setDiscounts] = useState<discount[]>([]);
    //const [data, setData] = useState(data);

    useEffect(() => {
        console.log(data)
    }, [])

    const turnPage = (direction: number) => {



        setObject( {checkout: {}}, direction);

    };

    return (
        <>

            <div style={{ marginTop: "2rem", width:"100%", lineHeight:"1.5rem", position:'relative' }}>

                <div style={{ position:'absolute', top: '-5rem', left: 0, color: "#fff3", fontSize: "4rem", fontWeight: 100 }}>{data.code}</div>

                <div style={{ opacity: 1, width: "100%", display: "flex", justifyContent:'space-between', padding: '0.9rem' }}>
                    <div className="text noSelect">6 aylık Essential Plan </div>
                    <div style={{ minWidth: '6rem', textAlign: "right" }} className="text noSelect">5500 ₺</div>
                </div>
                <div style={{ opacity: 0.5, width: "100%", display: "flex", justifyContent:'space-between', padding: '0.9rem' }}>
                    <div className="text noSelect">%15 ogrenci indirimi</div>
                    <div style={{ minWidth: '6rem', textAlign: "right" }} className="text noSelect">-775 ₺</div>
                </div>
                <div style={{ opacity: 0.5, width: "100%", display: "flex", justifyContent:'space-between', padding: '0.9rem', marginTop:'1rem', paddingTop: '2rem', borderTop:"#666 solid 1px"  }}>
                        <div className="text noSelect">6 ay taksit </div>
                        <div style={{ minWidth: '6rem', textAlign: "right" }} className="text noSelect">aylik 500 ₺</div>
                    </div>
                <div style={{ width: "100%", fontSize:"2rem", fontWeight:400 ,textAlign: "right", padding: '1.8rem 0rem', marginTop: '0.6rem', }} className="text"> 
                    4775<span style={{fontWeight:500, paddingLeft:7}}>₺</span>
                    
                </div>
            </div>

    
          <Control turnPage={turnPage} />
     
        </>
      );
    }