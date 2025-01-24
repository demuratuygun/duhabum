'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Control from './dialogue/Control';
import CreditCard from './dialogue/CreditCard';
import PickNumber from './dialogue/PickNumber';


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
    discounts:discount[],
    plan: packagetype,
    option: {duration:number, price:number, plan: string}
}

interface PaymentDetailsType {
    merchant_id: string;
    user_ip: string;
    merchant_oid: string;
    email: string;
    payment_amount: string;
    currency: string;
    test_mode: string;
    user_name: string;
    user_address: string;
    user_phone: string;
    merchant_ok_url: string;
    merchant_fail_url: string;
    debug_on: number;
    client_lang: string;
    payment_type: string;
    non_3d: string;
    card_type: string;
    installment_count: number;
    non3d_test_failed: string;
    user_basket: string;
    token: string;
    cc_owner?: string,
    card_number?: string,
    expiry_month?: string,
    expiry_year?: string,
    cvv?: string
}

const padNumber = (val: number|string) => {
    return (val+'').replace(/(\d)(?=(\d{3})+$)/g, '$1.');
  }


export default function Payment({ data, name, setObject}:{ data:any, name:string, setObject:(param: any, direction: number) => void }) {

    const checkout: checkoutType = data.checkout;
    const [card, setCard] = useState<any>({});
    const [bin, setBin] = useState<any>(null);
    const [amount, setAmount] = useState(0);
    const [focusCard, setFocusCard] = useState(false);
    const [paymentRequest, setPaymentRequest] = useState<PaymentDetailsType>();
    const [installment, setInstallment] = useState<number>(1);

    useEffect(() => {
        
        const amount = Math.floor((data.discounts??[]).reduce((a:number,b:discount)=>a*(100-b.rate)/100, checkout.option.price));
        data.total = amount;
        setAmount(amount);

    }, [])


    const  getBIN = async (binNumber:string) => {

        const response = await fetch('/api/getBIN', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({bin_number: binNumber})
        });

        let binResponse = await response.json();

        console.log(binResponse)
        

        if( binResponse.error ) 
            binResponse.brand = 'geçersiz kart'
        
        setBin(binResponse);
        
    }
    
    const generatePayment = async () => {

        const response = await fetch('/api/GeneratePayment', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data, 
                installment_count: installment==1?0:installment, 
                card_type: bin.brand, 
                ratios: bin.ratios, 
                itoken: bin.itoken 
            })
        });
        let generatePaymentRespond = await response.json();
        console.log(generatePaymentRespond)
        await setPaymentRequest(generatePaymentRespond);
        return generatePaymentRespond; 
        
    }

    const turnPage = async (direction: number) => {
        
        async function makePayment( paymentRequest:PaymentDetailsType ) {

            if(paymentRequest) {

                let paymentDetails:PaymentDetailsType = {...paymentRequest};
                
                paymentDetails.cc_owner = card.cc_owner;
                paymentDetails.card_number = card.card_number.replace(/\s+/g, '');
                paymentDetails.expiry_month = card.expiry_date.split('/')[0];
                paymentDetails.expiry_year = card.expiry_date.split('/')[1];
                paymentDetails.cvv = card.cvv;
                paymentDetails.debug_on = 1;
                paymentDetails.installment_count = installment==1?0:installment;

                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://www.paytr.com/odeme';

                for (const [key, value] of Object.entries(paymentDetails)) {
                    const hiddenField = document.createElement('input');
                    hiddenField.type = 'hidden';
                    hiddenField.name = key;
                    hiddenField.value = value;
                    form.appendChild(hiddenField);
                }

                document.body.appendChild(form);
                //alert('"'+paymentDetails.card_number+'"')
                
                form.submit();

            }

            //setObject( {}, direction);
        }

        if( card.cvv ) {
            let generatePaymentRespond = await generatePayment();
            console.log(generatePaymentRespond)
            makePayment(generatePaymentRespond);
        }
        else if( direction > 0) setFocusCard(prevFocusCard => !prevFocusCard); 
        else setObject( {}, -1);

    };

    const handleValid = async (thecard:any) => {
        console.log(thecard.card_number)
        if( thecard.cvv && !(card.cvv==thecard.cvv && thecard.cc_owner==card.cc_owner && thecard.card_number==card.card_number && thecard.expiry_date==card.expiry_date) ) {
            setCard(thecard);
            await generatePayment();
        }
    }

    //5406  6754  0667  5403
    return (
        <>

        <div style={{ maxWidth: "100vw", padding: "4%", display: 'flex', flexDirection: "column", gap: 15, paddingBottom:'6rem' }}>
            
            <div style={{ width: "100%", fontSize:"3rem", fontWeight:300 ,display: "flex", justifyContent:'space-between', alignItems:"baseline", padding: "1rem" }} className="text">
                <div style={{ opacity:0.5 }} className="text noSelect">{padNumber(Math.floor(amount/checkout.option.duration))} ₺ x {checkout.option.duration} ay</div>
                <div>{(paymentRequest?.payment_amount ? padNumber(paymentRequest.payment_amount??'0.00').slice(0,-3):amount)}<span style={{fontWeight:300, paddingLeft:7}}>₺</span></div>
            </div>

            <CreditCard name={name??""} allValid={(card)=> handleValid(card)} focusTo={focusCard} getBIN={getBIN} brand={bin?.brand??""}/>

            { bin && Object.keys(bin.ratios??{}).length>1?  
            <div style={{ padding:'1rem 0rem' }}>
                <PickNumber key={"pickInstallments"}
                    value={installment}
                    label='taksit'
                    unit='ay'
                    range={[1,Object.keys(bin.ratios).length+1]}
                    onChange={ (val:number) => {

                        if( val==installment ) return;
                        console.log('installent chage entered');
                        // update amout
                        var amount = Math.floor((data.discounts??[]).reduce((a:number,b:discount)=>a*(100-b.rate)/100, checkout.option.price));
                        if( val>1 ) {
                            let ratio = bin.ratios[val-2];
                            amount = amount/((100-ratio)/100);
                        }
                        setPaymentRequest( prev => {
                            if(!prev) return prev;
                            let pr = {...prev};
                            pr.payment_amount = amount.toFixed(2);
                            console.log(pr)
                            return pr;
                        });
                        data.total = amount;
                        setAmount(amount);
                        setInstallment(val);
                        
                    }}
                />
            </div>
            :null
            }

        </div>
    
        <Control turnPage={(dir) => turnPage(dir)} />
    
        </>
    );
}

