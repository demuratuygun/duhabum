import { useEffect, useState } from 'react';
import styles from './component.module.css';
import PickNumber from './dialogue/PickNumber';
import Text from './Text'; 

type PackageType = {
  plan: string;
  prices: number[];
  duration: number[];
  content: string[];
  unit: string;
  default: number;
}

export default function Package({ pack, click }: { pack: PackageType, click?: (month:number)=>void }) {
  
  const [duration, setDuration] = useState(pack.default);
  const [label, setLabel] = useState('süre');
  const [subtitles, setSubtitles] = useState<string[]>([' ']);
  const [showtitle, setShowtitle] = useState(0);

  useEffect( () => {
    setSubtitles([`toplam ${padNumber(pack.prices[pack.duration.indexOf(duration)]+'')}`]);
    showSubtitle(0);
  }, []);

  const showSubtitle = (set:number) => {
    setShowtitle(set);
    console.log((set+1)%subtitles.length, subtitles[set].length*200+3000);
    setTimeout( () => showSubtitle((set+1)%subtitles.length), subtitles[set].length*200+3000 );
  }

  const padNumber = (val: string) => {
    return val.replace(/(\d)(?=(\d{3})+$)/g, '$1.');
  }

  const handleDurationChange = (value: number) => {
    let label = '%'+Math.ceil((1- (pack.prices[pack.duration.indexOf(value)]/pack.duration[pack.duration.indexOf(value)]/mothlyFullPrice))*100)+" farkla";
    setLabel(value==1? 'yalnız' : label);
    setDuration(value);
  }

  const mothlyFullPrice = pack.prices[0]/pack.duration[0];
  const mothlyPrice = Math.floor(pack.prices[pack.duration.indexOf(duration)] / duration);

  return (
    <div style={{position:"relative"}}>

    
    

    {pack.plan=="Premium"?
      <div style={{ width:"calc(100% - 2rem)", height:'calc(50% - 2rem)', position:"absolute", top:'1rem', left:'1rem', backgroundColor:"#0000", borderRadius:"12px 12px 0px 0px", overflow:"hidden", border: "#0009 solid 1px" }}>
        <div style={{ width:'100%', height:'130%', position:'absolute', top:'-10rem', backgroundImage: 'radial-gradient(#C9C9C988, #C9C9C911 80%)' }}></div>
      </div>
    :null}

    {pack.plan=="Premium"?<div style={{ margin: '1rem', border:'#B7FE04cc solid 5px', position:"absolute", left:0, top: 0, background: "url('/dustcolor.gif') no-repeat center", rotate:"180deg", backgroundSize:"cover", opacity:0.15, zIndex:1, width: "calc(100% - 2rem)", height: "calc(100% - 2rem)", borderRadius:"14px" }}></div>:null}


    <div className={click == null ? "noSelect" : 'box noSelect'}
      style={{ margin: '1rem', width: "20rem", padding: "3.2rem 3rem 2.4rem 3rem", position: 'relative', zIndex:100 }}
    >
      

      {duration == 1 ? null :
        <div style={{ zIndex:100, position: "absolute", top: '-0.8rem', width: "calc(100% - 6rem)", display:'flex', justifyContent:'center' }}>
          <div style={{ width:'fit-content', backgroundColor:pack.plan=="Premium"? '#B7FE04':'#FEB704dd', color: "#222", padding: '0.1rem 1rem', borderRadius: "0.5rem", fontSize: "1rem", fontWeight: 500 }}>
            {pack.plan=="Premium"? 'En Kapsamlı Plan' : 'En Popüler Plan'}
          </div>
        </div>
      }

      <div className="text" style={{ fontSize:'1.4rem', textAlign: "center", zIndex:100 }}>{pack.plan}</div>  

      <div className="text" style={{ zIndex:100, fontSize: "2.7rem", fontFamily: "1rem", textAlign: "center", fontWeight: 500, padding: 0 }}>
        <span> ₺ {padNumber(mothlyPrice + "")} </span>
        {pack.duration.length > 1 ? <span style={{ fontWeight: 300, fontSize: "1.4rem", color: "#DFDFDF80" }}>{' / ' + pack.unit}</span> : null}
      </div>


      {subtitles.map( 
        (title, i) => i==showtitle?
            <div key={'subtitle-'+i} className="text" style={{ zIndex:100, textAlign: "center", position: "relative", top: -8, fontWeight: 300, fontSize:"1.2rem", color: "#DFDFDF80" }}>
              {title}
            </div>
        :"tok"
      )}

      
      <div className='noSelect' style={{zIndex:100, width: "100%", textAlign: "center", fontSize: "0.9rem" }}>
        <PickNumber label={label} value={duration} unit={pack.unit} range={{ values: pack.duration }} onChange={handleDurationChange} />
      </div>

      <ul style={{ margin: "1rem 0rem 1rem 1.6rem", paddingBottom: "0.8rem", listStyleImage: "url('check.svg')", color: "#DFDFDF80", fontWeight: 500 }}>
        { pack.content.map((item, i) =>
          item != '100% gelişim garantisi' || duration > 2 ?
            <li key={i} 
              className={ pack.plan=="Premium" && ( i<=2)? styles.gradientText:''} 
              style={{ paddingBottom:'0.9rem', paddingLeft: "3px", color: pack.plan=="Essential"&& item=="100% gelişim garantisi"? '#fff':"" }}>
                {item}
            </li>
            : null
        )}
      </ul>

      {click == null ? null : 
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <button style={{ border: pack.plan=="Premium"? '#fff4 solid 1px':'' }} onClick={() => click(duration)}>katıl</button>
        </div>}
    
    </div>

    </div>
  );
}
