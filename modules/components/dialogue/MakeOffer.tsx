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



const codes = {
    'OGR15': [{rate: 15, name: 'öğrenci indirimi'}],
    'VIP620': [{rate: 20, name: 'vip indirimi'}],
    'VIP720': [{rate: 20, name: 'vip indirimi'},{rate: 15, name: 'öğrenci indirimi'}],

}

const installmentRates = [1.0095, 1.0326, 1.0509, 1.0689, 1.0867, 1.1045, 1.1225, 1.1437, 1.1631, 1.1830, 1.2024, 1.2218]


const offers = {
    20000: {plan:'Premium', duration: 18, price: 12499},
    7000: {plan:'Premium', duration: 6, price: 7499},
    4000: {plan:'Essential', duration: 6, price: 4200},
}

export default function MakeOffer({plan, months, setObject}:{ plan:packagetype, months:number, setObject:(param: any, direction: number) => void }) {
    
    const [discounts, setDiscounts] = useState<discount[]>([]);
    const [code, setCode] = useState("");
    const [installment, setInstallment] = useState<number>(12);
    const [selected, setSelected] = useState(0);
    const [options, setOptions] = useState([
        {duration: 3, plan:'Essential', price: 2799},
        {duration: 6, plan:'Essential', price: 3840}
    ]);

    const checoutRef = useRef({
        code: code,
        promotions: discounts,
        plan: plan,
        option: options[selected],
        installment: selected === 0 && installment > 6 ? 6 : installment,
        installmentRate: installmentRates[(selected === 0 && installment > 6 ? 6 : installment) - 1]
    });

    
    
    const turnPage = ( direction: number ) => {
        console.log(checoutRef.current)
        setObject( {checkout: checoutRef.current}, direction);
    }

    useEffect( () => {
        let c = {
                code: code,
                promotions:discounts,
                plan: plan,

                option: options[selected],
                
                installment: selected==0 && installment>6? 6 : installment,
                installmentRate: installmentRates[(selected==0 && installment>6? 6 : installment)-1]
            }
        checoutRef.current = c;
        console.log(c);

    }, [code, discounts, options, selected, installment, plan]);

    const onChange = (change:string) => {
    
        change = change.toUpperCase();
        for (const [key, value] of Object.entries(codes)) {
            if(change == key) {
                setDiscounts(value);
                
                break;
            }
        }
        setCode( change )
    }

    useEffect( () => {

        let code = localStorage.getItem("code");
        if(code) onChange(code);

        // add current plan
        let plans = [{plan: plan.plan, duration: months,  price: plan.prices[plan.duration.indexOf(months)] }];

        for ( const [key, value] of Object.entries(offers) ) {
            
            if( plans[0].price < parseInt(key) ) {
                plans.push(value);
                break;
            }
        }

        setOptions(plans);

      }, [plan, months]);
    
      return (
        <>
          <div className={styles.container} style={{gap: "1.5rem", }}>

            <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{duration:1}} style={{ width:"100%", textAlign:"center" }}>
                {discounts?.length>0?

                    discounts?.map( (promo, index) => 
                        <div key={`discountRow-${index}`} className={styles.CalculatorText} style={{ fontSize: "1.3rem", width:"%100" }}>
                            <Text text={`%${promo.rate} ${promo.name}`+(index==discounts.length-1?" ile":'')} />
                        </div>
                    )
                    :
                    <TextEnter caret={true}
                        Value={code}
                        examples={['promosyon kodu', 'ogrenci promosyonu: OGR15']} 
                        onChange={onChange}
                    />
                
                }
            </motion.div>


            { options.map( (option, index) => {

                const divide = option.duration<3? Math.min(3,installment): option.duration<5? Math.min(6, installment) : installment;
                const amount = Math.floor((discounts.reduce((a,b)=>a*(100-b.rate)/100, option.price)*installmentRates[divide-1])/divide);
        
                return (
                <motion.div key={'offerBox-'+index} animate={{opacity:1}} initial={{opacity:0}} transition={{duration:1}} className='box noSelect' onClick={()=>setSelected(index)}
                    style={{width:'100%', padding: '2rem', fontSize: "1.3rem", backgroundColor:selected==index?'#aaaaaa24':'#0000', position:"relative", marginBottom: '0.5rem', border: index>0?"#fff4 solid 1px":'' }}
                >
                    { 
                        index==0? null:
                        <div style={{ position: "absolute", top: '-0.8rem', width: "calc(100% - 4rem)", display:'flex', justifyContent:'center' }}>
                            <div style={{ width:'fit-content', backgroundColor: "#ccc", color: "#222", padding: '0.1rem 1rem', borderRadius: "0.5rem", fontSize: "1rem", fontWeight: 600 }}>
                                özel teklif
                            </div>
                        </div>
                    }

                    {option.duration} ay sürecek

                    <div style={{fontFamily: "'Sarpanch', sans-serif", fontWeight: 800, fontSize: "1.8rem" }}>{option.plan} Plan</div>
                    
                    <div style={{fontSize: "1.1rem", marginTop:"1rem", color: '#fff6'}}>
                        {divide} ay taksitle aylik {amount}<br />
                        toplam {discounts.length>0? Math.floor(option.price*installmentRates[divide-1]/divide)*divide+' yerine ':''} 
                        ₺{amount*divide}
                    </div>
                
                </motion.div>
                );
                })
            }
            

            <PickNumber key={"pickInstallments"}
                value={installment}
                label='taksit'
                unit='ay'
                range={[1,12]}
                onChange={(val:number) => setInstallment(val)}
              />
          
          </div>
    
          <Control turnPage={ (direction: number) => turnPage(direction) } />
     
        </>
      );
    }