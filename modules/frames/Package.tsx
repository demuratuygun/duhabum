'use client'
import styles from './frames.module.css';
import Package from '../components/Package';
import { useRouter } from 'next/navigation';
import packages from '../../content/package.json';
import { useState } from 'react';


export default function PackageFrame() {

  const router = useRouter();

  return (
    <div id="pakagesId" className={styles.packages} style={{ position: 'relative', width: "100vw", padding: "10% 0px 0px 0px", margin: "0px", overflow: 'clip', zIndex: 700 }}>
      {packages.tr.map((pack, i) => (
        <Package
          key={i}
          pack={pack}
          click={(month:number) => {
            localStorage.setItem('packageId', i.toString());
            localStorage.setItem('month', month.toString());
            router.push("/package/" + i + "/" + month)
          }}
        />
      ))}
    </div>
  );
}
