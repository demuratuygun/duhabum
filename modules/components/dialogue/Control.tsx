
import Next from "@/modules/icons/Next";
import { useCallback, useEffect, useRef, useState } from "react";


interface CTRProps { turnPage: (param: number) => void }
export default function Control({ turnPage }:CTRProps) {

  const [dir, setDir] = useState(0);
  const actionTaken = useRef(false);

  const handleScrollLikeEvent = useCallback( (event: WheelEvent) => {

    if ( actionTaken.current ) return;
    actionTaken.current = true;
    
    if(dir!=0) return null;
    setDir(event.deltaY>0?1:-1);
    setTimeout( () => { turnPage(event.deltaY>0?1:-1); setDir(0); actionTaken.current=false }, 1000 );
    event.preventDefault();
    
  }, [dir]);

  useEffect( () => {

    setTimeout(() => {
      window.addEventListener('wheel', handleScrollLikeEvent, { passive: false });
    }, 1000);

    return () => {
      window.removeEventListener('wheel', handleScrollLikeEvent);
    };
  }, [handleScrollLikeEvent]);

  return(
    <div className="control" >
      <span style={{ rotate:"180deg", paddingLeft: "5rem" }} onClick={() => turnPage(-1)}>
        <Next color={dir==-1?"#DFDFDF": "#DFDFDF88"}/>
      </span>
      <span onClick={() => turnPage(1)}>
        <Next color={dir==1?"#B7FE04": "#DFDFDF"}/>
        </span>
    </div>
  )
}