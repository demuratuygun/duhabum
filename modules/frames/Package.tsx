
import styles from './frames.module.css';
import Package from '../components/Package';


export default function PackageFrame() {
  return (
    <div className={styles.packages} style={{ position: 'relative', width: "100vw",  padding: "0px", margin: "0px",overflow: 'clip'  }}>
        
        <Package plan='basic plan' price={4490} duration='4 Ay' content={["Özel  antreman Plani","Beslenme Planlaması","Karın Kası ve Kardiyo ","Düzenli Form Kontrol"]} />
        <Package plan='premium' price={5990} duration='6 Ay' content={["Özel  antreman Plani","Beslenme Planlaması","Karın Kası ve Kardiyo ","Düzenli Form Kontrol","sinirsiz danismanlik","Görüntülü Görüşmeler"]} />
      
    </div>
  );
}
