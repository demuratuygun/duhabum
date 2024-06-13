'use client'
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Light.module.css';
import Control from './dialogue/Control';


interface LoginProps { title:string, text:string, turnPage: (param: number) => void }
export default function Login({title, text, turnPage}:LoginProps) {


    return (
        <>
        <div style={{display: 'flex', flexDirection: "column", gap: 15}}>
            <div style={{ margin:"0rem 1rem", fontFamily:"'Sarpanch', sans-serif", fontWeight:800, fontSize:"2.5rem",lineHeight:"1.75rem", textAlign:"center" }}><span style={{fontSize:"1.2rem"}}>{" BASIC"}</span><br/> DUHABUM </div>
            <p> Sana özel beslenme ve antreman planı geliştirirken bazı bilgilere sahip olmamız önemli </p>
                
        </div>
        <Control turnPage={(dir) => turnPage(dir)}/>
        </>
    );
  }
  