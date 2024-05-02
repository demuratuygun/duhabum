'use client'
import { useState } from 'react';
import Menu from '../icons/Menu'
import Cancel from '../icons/cancel';


export default function Header({}) {
    const [expanded, setExpended] = useState(false);
    

    return (
        <>
        <div className="headerLandscape noSelect" style={{ scale: 0.9 }}>
            <div>Paketler</div>
            <div>Değişim</div>
            <div>İletişim</div>
        </div>
        <div className="headerVertical noSelect">
            <div onClick={() => setExpended(true)}>
                <Menu/>
            </div>
            {expanded?
            <div style={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0 }} onClick={() => setExpended(false)}>
            <div className='headerMenu'>
                <div style={{ position: "absolute", top: '1.5vh', left: '1.5vh', opacity: 0.9 }}  onClick={() => setExpended(false)}>
                    <Cancel/>
                </div>
                <div>Paketler</div>
                <div>Değişim</div>
                <div>İletişim</div>
            </div>
            </div>:null}
        </div>
        </>
    );
  }
  