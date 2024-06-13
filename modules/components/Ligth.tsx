'use client'
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Light.module.css';

export default function Light({}) {

    const {scrollYProgress} = useScroll();
    const lightopacity = useTransform(scrollYProgress, 
        [0, 0.10, 0.2, 0.3, 0.5, 0.55, 0.66, 0.8, 1 ], 
        [1, 0.2, 1, 0.8, 0, 1, 0, 1, 1]
    );
    const lighx = useTransform(scrollYProgress, 
        [0, 0.16, 0.24, 0.4, 0.5, 0.7], 
        [10, -20, -50, 0, 500, -20]
    );
    const lighy = useTransform(scrollYProgress, 
        [0, 0.16, 0.24, 0.4, 0.5, 0.95], 
        [10, -20, -50, 0, 200, -50]
    );
    const lighr = useTransform(scrollYProgress, 
        [0, 0.45, 0.5, 0.7, 1], 
        [0, 10, 30, 0, -5]
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
  