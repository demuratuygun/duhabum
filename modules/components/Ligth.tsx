import styles from './Light.module.css';

export default function Light({}) {
    return (
        <div className={`${styles.lightsmoke} ${styles.noSelect}`}>
            <div>
                <div className={styles.light}></div>
                <div className={styles.lightemmit}></div>
            </div>
        </div>
    );
  }
  