'use client'
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Light.module.css';
import { useEffect, useState } from 'react';

export default function Light({}) {

    const {scrollYProgress} = useScroll();
    const [lightyValues, setLightyValues] = useState([20, -20, -50, 0, 200, -50]);
    const [lightxValues, setLightxValues] = useState([100, -20, -50, 0, 500, -20]);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            setLightyValues([-20, -20, -50, 0, 200, -50]);
            setLightxValues([40, -20, -50, 0, 500, -20]);
        }
    }, []);


    const lightopacity = useTransform(scrollYProgress, 
        [0, 0.05, 0.1, 0.2, 0.3, 0.5, 0.55, 0.66, 0.8, 1 ], 
        [0.9, 0.4, 1, 1, 0.8, 0, 1, 0, 1, 1]
    );
    const lighx = useTransform(scrollYProgress, 
        [0, 0.16, 0.24, 0.4, 0.5, 0.7], 
        lightxValues
    );
    const lighy = useTransform(scrollYProgress, 
        [0, 0.16, 0.24, 0.4, 0.5, 0.95], 
        lightyValues
    );
    const lighr = useTransform(scrollYProgress, 
        [0, 0.45, 0.5, 0.7, 1], 
        [-4, 10, 30, 0, -5]
    );

    return (
        <motion.div style={{opacity:lightopacity, y:lighy, x:lighx, rotate:lighr }} className={`${styles.lightsmoke} ${styles.noSelect} noSelect`}>
            <div>
                <div className={styles.light}></div>
                <div className={styles.lightemmit}></div>
            </div>
        </motion.div>
    );
  }
  