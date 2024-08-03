'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './creditcard.module.css';
//https://www.freepnglogos.com

const container = {
    hidden: { 
        y: "-50%",
        opacity: 0,
        transition: {
            type: "tween",
            delayChildren: 0.1,
            staggerChildren:0.1
          }
    },
    visible: {
       y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delayChildren: 0.1,
        staggerChildren:0.1
      }
    }
  }
    
  const item = {
    hidden: {  y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }



export default function CreditCard({name='', brand='', allValid, focusTo, getBIN}:{name?:string, brand:string, allValid:(valid:any)=>void, focusTo:boolean, getBIN:Function}) {

    const [cardName, setCardName] = useState(name??"");
    const [cardNumber, setCardNumber] = useState('');
    const [pattern, setPattern] = useState('');
    
    const [expireDate, setExpireDate] = useState('');
    const [expireDateValid, setExpireDateValid] = useState(true);//Valid
    
    const [cvvCode, setCvvCode] = useState('');
    const [cvvCodeLen, setCvvCodeLen] = useState(4);

    const [isFlipped, setIsFlipped] = useState(false);

    const [focus, setFocus] = useState(0);


    const nameInput = useRef<HTMLInputElement>(null);
    const numberInput = useRef<HTMLInputElement>(null);
    const expireInput = useRef<HTMLInputElement>(null);
    const cvvInput = useRef<HTMLInputElement>(null);


    const cardPatterns = {
        visa: /^4/,
        mastercard: /^(5[1-5]|2[2-7])/,
        amex: /^3[47]/,
        discover: /^6(?:011|5|4[4-9])/,
        diners: /^3(?:0[0-5]|[68])/,
        jcb: /^(?:2131|1800|35)/,
    };


    useEffect( () => {
        focusToNextInvalid();
      }, [focusTo]);


    const detectCardType = (number: string) => {
        for (const [type, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(number)) {
            return type;
        }
        }
        return '';
    };

    const focusToNextInvalid = useCallback(() => {
        allValid({});
        if( cardName.length<3 ) {
            if(isFlipped) setIsFlipped(false);
            nameInput.current?.focus();
        }
        else if ( cardNumber.length<22 ) {
            if(isFlipped) setIsFlipped(false);
            numberInput.current?.focus();
        } 
        else if ( expireDate.length<5 || !expireDateValid ) {
            if(!isFlipped) setIsFlipped(true);
            expireInput.current?.focus();
        }
        else if ( cvvCode.length>=3 ) {
            if(!isFlipped) setIsFlipped(true);
            cvvInput.current?.focus();
        }
        else allValid({
            cc_owner: cardName,
            card_number: cardNumber,
            expiry_date: expireDate,
            cvv: cvvCode
        });
    }, [isFlipped, setIsFlipped, cardName, cardNumber, expireDate, expireDateValid, cvvCode,cvvCodeLen, nameInput, numberInput, expireInput, cvvInput]);

    const handleClick = () => {
        setIsFlipped(prevIsFlipped => !prevIsFlipped);
    };

    const handleBlur = () => {

        if(isFlipped) {
            if(cvvCode.length>=3 && expireDateValid) {
                setTimeout( () => {
                    setIsFlipped(false);
                    if(cardName.length<4 ) {
                        nameInput.current?.focus();
                    } else if( cardNumber.length<22 )  {
                        numberInput.current?.focus();
                    } else allValid({            
                        cc_owner: cardName,
                        card_number: cardNumber,
                        expiry_date: expireDate,
                        cvv: cvvCode
                    });;
                }, 1000);
            }
        } else {// on front face
            if( cardName.length>3 && cardNumber.length>=22 ) {
                if( cvvCode.length<cvvCodeLen || expireDate.length<5 || !expireDateValid ) 
                    setTimeout(() => setIsFlipped(true), 600);
                else allValid({ 
                    cc_owner: cardName,
                    card_number: cardNumber,
                    expiry_date: expireDate,
                    cvv: cvvCode
                });;
            }
        }
    };

    const handleCardNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        allValid({});
        const value = event.target.value.replace(/[^A-Z ]/gi, '');
        const formattedValue = value.replace(/ +/g, ' ')
        setCardName(formattedValue);
    }

    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        allValid({});

        const value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
        
        let numPattern = detectCardType(value);
        setPattern( numPattern );
        if(numPattern=='mastercard'||numPattern=='visa'||numPattern=='discover') setCvvCodeLen(3);
        
        const formattedValue = value.replace(/(.{4})/g, '$1  ').trim();
        setCardNumber(formattedValue);

        if(formattedValue.length==10) getBIN(formattedValue.replace(/\s+/g, '').slice(0,8));
        
        if(formattedValue.length>=22) {
            if ( expireDate.length<5 || !expireDateValid ) {
                if(!isFlipped) setIsFlipped(true);
                expireInput.current?.focus();
            }
            else if ( cvvCode.length<cvvCodeLen ) {
                if(!isFlipped) setIsFlipped(true);
                cvvInput.current?.focus();
            }
        }
    };

    const handleExpireDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        allValid({});

        let padding = false;
        if(event.target.value[1]==" " || event.target.value[1]=="/") // 9/ -> 09/
            padding = true;
        
        let formattedValue = event.target.value.replace(/[^0-9]/g, '');

        if( formattedValue.length==1 ) 
            if(padding || parseInt(formattedValue[0])>1) 
                formattedValue = "0"+formattedValue[0];
        if( expireDate.length==3 && formattedValue.length==2 ) {    
            formattedValue = formattedValue[0];
        }
        if(formattedValue.length>=2)
            formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
        setExpireDate(formattedValue);
        
        if( formattedValue.length==5 ) {
            let [month, year] = formattedValue.split("/").map(val => parseInt(val));
            let today = new Date().getTime();
            let expire = new Date(month+"/01/20"+year).getTime();
            let diff = Math.floor( (expire - today) / (1000 * 60 * 60 * 24));
            if( !diff || diff<0 || diff>3652 ) setExpireDateValid(false);
            else {
                setExpireDateValid(true);
                if( cvvCode.length < cvvCodeLen )
                    cvvInput.current?.focus();
                else {
                    if( cardName.length<3 ) {
                        setIsFlipped(false);
                        setTimeout(() => nameInput.current?.focus(), 1000);
                    } else if( cardNumber.length<22 ) {
                        setIsFlipped(false);
                        setTimeout(() => numberInput.current?.focus(), 1000);
                    }
                }
            }
        }
        
    };

    const handleCVVChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        allValid({});

        if( cvvCode.length==0 && event.target.value.length==0 ) 
            expireInput.current?.focus();
        const value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        setCvvCode(value);
        if( value.length >= 3 ) {
            if( expireDate.length==5 && expireDateValid) {
                if( cardName.length<3 ) {
                    setIsFlipped(false);
                    setTimeout(() => nameInput.current?.focus(), 1000);
                } else if( cardNumber.length<22 ) {
                    setIsFlipped(false);
                    setTimeout(() => numberInput.current?.focus(), 1000);
                }
            } else {
                setTimeout(() => expireInput.current?.focus(), 700);
            }
        }
    
    }
    
    return (

        <div className={`${styles.cardContainer} noSelect ${isFlipped ? styles.flipped : ''}`}>
        <div className={styles.card}>

            <div className={styles.cardBack}>

                    <div style={{ zIndex: 400, width:"100%", height:"100%", backgroundColor:"#1b1b1b", borderRadius:10, position:"absolute", top:0}} onClick={handleClick}></div>
                    <div style={{ zIndex: 900, width:"100%", position:"absolute", top:70, padding: "1rem"}}>
                        <input style={{ zIndex: 900, minWidth: "110px", width: "6rem", float: "left", color:expireDateValid?"":"#f88" }} 
                            className={styles.creditcard} 
                            type="text" 
                            ref={expireInput}
                            placeholder="AY/YIL" 
                            value={expireDate} 
                            onChange={handleExpireDateChange} 
                            maxLength={5} 
                            onBlur={handleBlur}
                        />
                        <input style={{ zIndex: 900, minWidth: "110px", width: "6rem", float: "right", textAlign: "right" }} 
                            type="text" 
                            className={styles.creditcard} 
                            ref={cvvInput} 
                            placeholder="CVV" 
                            value={cvvCode} 
                            onChange={handleCVVChange} 
                            maxLength={cvvCodeLen} 
                            onBlur={handleBlur}
                        />
                    </div>

                    <div style={{ zIndex: 500, width:"100%", height:"48px", backgroundColor:"#0c0c0c", position:"absolute", bottom:40}} onClick={handleClick}></div>
            
            </div>
            <div className={styles.cardFront}>

                <div style={{ zIndex: 10, width:"100%", height:"100%", backgroundColor:"#4440", borderRadius:10, position:"absolute", top:0}} onClick={handleClick}></div>
                
                <div style={{position:'absolute', top:'30%', left:'2rem'}}>{brand}</div>

                <Image  onClick={handleClick} style={{ visibility: "visible", margin: "2rem", filter: 'grayscale(120%)', transition: 'transform 1s' }} draggable="false" src="/chip.png" height={38} width={50} alt="chip" />
                {pattern=='mastercard'||pattern=='visa'?
                    <Image  onClick={handleClick} style={{ visibility: "visible", position:"absolute", right: pattern=='visa'?"2.6rem":"2rem", top:pattern=='visa'?"2.4rem":"1.25rem", filter:pattern=='visa'?'contrast(50%) brightness(160%)':'' }} src={"/"+pattern+".png"} height={38} width={pattern=='visa'?64:60} alt="duha bum in dark" />
                    :null
                }
                <div style={{ zIndex: 100, padding: "min(6vw, 1.2rem) min(2vw, 1rem)", position: 'absolute', bottom: 1 }}>
                    <input ref={nameInput} className={styles.creditcard} style={{ fontSize:"1.4rem", width:'100%', position:"relative", bottom:-6 }} type="text" placeholder="ISIM SOYISIM" value={cardName} onChange={handleCardNameChange} onBlur={handleBlur}/>
                    <input ref={numberInput} className={styles.cardNumber} style={{ fontSize:"min(6.4vw, 1.9rem)", width:'100%' }} type="text" placeholder="xxxx xxxx xxxx xxxx" value={cardNumber} onChange={handleCardNumberChange} maxLength={22} onBlur={handleBlur}/>
                </div>
                
            </div>
        </div>
        </div>

    );
  }
  