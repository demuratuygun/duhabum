'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function ImageView({  id, data, inView, }: { id: string; data: any; inView: { id: string } | null; }) {

    const [viewElement, setViewElement] = useState<{ row: number; column: number } | null>(null);
    const router = useRouter();

    // Handle opening the image viewer
    useEffect(() => {
        if (inView) {
        const index = findItemById(inView.id);
        if (index) {
            setViewElement(index);
            router.push(`?view=${inView.id}`, { scroll: false }); // Update URL without full reload
        }
        }
    }, [inView]);

    // Handle browser back/gesture back
    useEffect(() => {
        const handlePopState = () => setViewElement(null);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Handle closing the image view
    const closeViewer = () => {
        setViewElement(null);
        router.back(); // Go back in browser history when viewer is closed
    };

    const findItemById = (targetId: string) => {
        for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        for (let colIndex = 0; colIndex < data[rowIndex].length; colIndex++) {
            if (data[rowIndex][colIndex].id === targetId) {
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
            <Image id={id + '_fullImage'}
                data-track fill loading="lazy" draggable={false}
                src={data[viewElement?.row??0][viewElement?.column??0].src}
                alt={data[viewElement?.row??0][viewElement?.column??0].alt}
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
