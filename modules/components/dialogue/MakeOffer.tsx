'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './dialogue.module.css';
import Control from './Control';
import Text from '../Text'; 
import TextEnter from './TextEnter';
import PickNumber from './PickNumber';
import Promotioins from '../../../content/promotions.json';


interface packagetype {
    plan: string, 
    default:number, 
    prices: number[], 
    duration: number[], 
    unit:string  
}

interface optionType {
    plan: string,
    duration: number,
    price: number
}

const padNumber = (val: number) => {
    return (val+'').replace(/(\d)(?=(\d{3})+$)/g, '$1.');
  }

export default function MakeOffer({plan, months, setObject}:{ plan:packagetype, months:number, setObject:(param: any, direction: number) => void }) {

    const [selected, setSelected] = useState(0);
    const [options, setOptions] = useState<optionType[]>([]);
    
    useEffect( () => {

        // add current plan as offer
        let plans = [{plan: plan.plan, duration: months,  price: plan.prices[plan.duration.indexOf(months)] }];

        for ( const [key, value] of Object.entries(Promotioins.offers) ) {
            
            if( plans[0].price < parseInt(key) ) {
                plans.push(value);
                break;
            }
        }

        setOptions(plans);

    }, [plan, months]);

    const turnPage = ( select:number ) => {
        let c = {
            option: options[select]
        }
        setObject( {checkout: c}, 1);
    }
    
      return (
        <>
          <div className={styles.container} style={{gap: "1.5rem", maxWidth:'21rem'}}>

            { options.map( (option, index) => {

                const amount = option.price;
        
                return (
                <motion.div key={'offerBox-'+index} animate={{opacity:1}} initial={{opacity:0}} transition={{duration:1}} className='box noSelect' onClick={()=>turnPage(index)}
                    style={{ width:'100%', padding: '2rem', fontSize: "1.3rem", backgroundColor:'#aaaaaa24', position:"relative", marginBottom: '0.5rem', border: index>0?"#B7FE04aa solid 1px":'' }}
                >
                    { 
                        index==0? null:
                        <div style={{ position: "absolute", top: '-0.8rem', width: "calc(100% - 4rem)", display:'flex', justifyContent:'center' }}>
                            <div style={{ width:'fit-content', backgroundColor: "#B7FE04", color: "#222", padding: '0.1rem 1rem', borderRadius: "0.5rem", fontSize: "1rem", fontWeight: 600 }}>
                                özel teklif
                            </div>
                        </div>
                    }

                    <div>{option.duration} ay sürecek</div>
                    <div style={{ position:"relative", bottom:7, fontFamily: "'Sarpanch', sans-serif", fontWeight: 800, fontSize: "1.8rem", padding:0 }}>
                        {option.plan} Plan
                    </div>
                    <div style={{ position:"relative", bottom:9, fontWeight: 600, fontSize: "1.4rem", padding:0, margin:0 }}>
                        ₺{padNumber(Math.floor(amount/option.duration))} / ay
                    </div>

                    <div style={{ fontSize: "1.1rem", marginTop:"1rem", color: '#fff6'}}>
                        toplam <span style={{color:'#B7FE04', fontWeight:500}}>₺{padNumber(amount)}</span>
                    </div>
                
                </motion.div>
                );
                })
            }
        
          
          </div>
     
        </>
      );
    }