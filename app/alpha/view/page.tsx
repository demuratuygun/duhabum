'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEngages } from '@/context/EngageContext';


export default function ImageView() {

    const [viewElement, setViewElement] = useState<{ row: number; column: number } | null>(null);
    const [data, setData] = useState<any[][]|null>(null);
    
    const router = useRouter();
    const params = useSearchParams();
    const id = params.get('id');

    const { onEvent } = useEngages();

    // Handle browser back/gesture back
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('viewIamge') ?? '{}');
        setData( data );
        setViewElement( findItemById(id??'', data) );
        if(id) onEvent?.({id, act:'open', ui:'img' });
        return (() => {
            if(id) onEvent?.({id, act:'close', ui:'img' });
        })
    }, []);

    // Handle closing the image view
    const closeViewer = () => {
        setViewElement(null);
        router.back(); // Go back in browser history when viewer is closed
    };

    const findItemById = (targetId: string, data:any) => {
        for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
            for (let colIndex = 0; colIndex < data[rowIndex].length; colIndex++) {
                if (data[rowIndex][colIndex]?.id === targetId) {
                    return { row: rowIndex, column: colIndex };
                }
            }
        }
        return null;
    };

    if (!viewElement) return null;

    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#000c',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
        <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{ duration:1 }}
            style={{ width: '100%', height: '80%', }}
            className="noSelect"
        >
            <Image id={id ?? "fullImage"}
                data-track fill loading="lazy" draggable={false}
                src={data ? data[viewElement?.row ?? 0][viewElement?.column ?? 0].src : ''}
                alt={data ? data[viewElement?.row ?? 0][viewElement?.column ?? 0].alt : ''}
                style={{ objectFit: 'contain' }}
            />
        </motion.div>

        <div
            className={" noSelect"} 
            style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                fontSize: '3rem',
                zIndex: 1001,
                cursor: 'pointer',
                color: 'white',
            }}
            onClick={closeViewer}
        >
            <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#ffffff"/>
            </svg>
        </div>

        </motion.div>
  );
}
