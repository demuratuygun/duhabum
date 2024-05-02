import Image from 'next/image';
import styles from './frames.module.css';
import Arrow from '../icons/Arrow';

export default function IntroFrame() {
  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", paddingTop: "20vh" }}>

        <Image className={styles.picture} src="/manindark.jpg" height={500} width={500} alt="duha bum in dark"/>
        <div className={styles.title}> Kendini Yeniden İnşa Et<Arrow /> </div>
      
    </div>
  );
}
