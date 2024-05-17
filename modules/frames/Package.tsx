'use client'
import styles from './frames.module.css';
import Package from '../components/Package';
import { useRouter } from 'next/navigation';
import packages from '../../content/package.json';


export default function PackageFrame() {

  const router = useRouter();

  return (
    <div id="pakagesId" className={styles.packages} style={{ position: 'relative', width: "100vw",  padding: "0px", margin: "0px",overflow: 'clip', zIndex: 700  }}>
        
        {packages.tr.map( (pack, i) => 
          <Package pack={pack} click={() => router.push( "/package/"+i )}/> 
        )}
    
    </div>
  );
}