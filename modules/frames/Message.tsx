import Image from 'next/image';
import styles from './frames.module.css';
import Arrow from '../icons/Arrow';

export default function MessageFrame() {
  return (
    <div style={{ position: 'relative', display: "flex", justifyContent: "center", alignItems: "center",width: "100vw", height: "100vh",  padding: "0px", margin: "0px",overflow: 'clip'  }}>

        <Image className={styles.picture2} src="/faceindark.jpeg" layout="fill" objectFit="cover" alt="duha bum face in dark"/>
        <div className={styles.title}> hedefini belirle, <br/>hemen basla<Arrow /> </div>
      
    </div>
  );
}
