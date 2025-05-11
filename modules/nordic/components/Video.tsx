'use client';

import { use, useEffect, useRef, useState } from 'react';
import styles from './nordic.module.css';
import { motion } from 'framer-motion';
import { useEngages } from '@/context/EngageContext';

  export default function Video({ id, src, title, active=true, noConrtol=false, style }: { 
    id:string,
    src: string, 
    title: string, 
    active?: boolean, 
    noConrtol:boolean, 
    style?:any 
  }) {

    const videoRef = useRef<HTMLVideoElement|null>(null)

    const [muted, setMuted] = useState(active);
    const [playing, setPlaying] = useState(active);
    const [playspeed, setPlayspeed] = useState(1);
    const { onEvent, logEvent } = useEngages();

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.addEventListener('ended', () => {
          logEvent?.({name: 'videoComplete', ui: 'video', id, act:'ended', val:1});
          setPlaying(false);
        });
      }
      setTimeout( () => setPlaying(!videoRef.current?.paused), 800);

      return () => {
        if (videoRef.current && videoRef.current.duration) {
          logEvent?.({name: 'videoComplete', ui: 'video', id, act:'ended', val:videoRef.current.currentTime / videoRef.current.duration});;
        }
      }

    }, []);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.muted = muted;
        logEvent?.({ ui: 'video', id, act:'muted', val:videoRef.current?.currentTime});
      }
    }, [muted]);

    useEffect(() => {
      
      if (videoRef.current) {
        if (playing) {
          videoRef.current.play();
          logEvent?.({ ui: 'video', id, act:'play', val:videoRef.current?.currentTime});
        } else {
          videoRef.current.pause();
          logEvent?.({ ui: 'video', id, act:'pause', val:videoRef.current?.currentTime});
        }
      }

    }, [playing]);


    useEffect(() => {
      
      if (videoRef.current) {
        videoRef.current.playbackRate = playspeed;
      }

    }, [playspeed]);

    const replay10 = () => {
      if (videoRef.current) {
        videoRef.current.currentTime -= 10;
      }
    }

    const forward10 = () => {
      if (videoRef.current) {
        videoRef.current.currentTime += 10;
      }
    }

    const handleDoubleClick = () => {
      const videoElement = videoRef.current;
  
      if (videoElement) {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
          logEvent?.({ name:'videoFullScreen', ui: 'video', id, act:'fullscreen', val:videoRef.current?.currentTime});
        }
      }
    };


    return (

      <motion.div className='media'
        viewport={{ amount:'some' }}
        initial={ noConrtol?{}:{ opacity:0, filter: 'blur(400px)', scaleY:0.5, scaleX:1.5 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', scaleY:1, scaleX:1 }}
        transition={{ delay:0, duration:1 }}
        style={{ 
          position:'relative', 
          overflow:'hidden',
          display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'13px',
          backgroundColor:  'var(--primary-variant)',
          
          }}>
      
        <video ref={videoRef} id={id} data-track 
          onClick={() => { if(!noConrtol) setPlaying(!playing)} }
          style={{ 
            zIndex: 0, 
            borderRadius:'13px', 
            width:'100%', 
            height:'100%', 
            maxWidth:'100%',
            minWidth:'min(90vw, 450px)',
            maxHeight:'90vh',
            objectFit:'cover', 
            ...style,
          
          }}
          preload="metadata"
          src={src}
          title={title}
          autoPlay={active}
          muted={muted}
          loop={true}
          controls={false}
          onDoubleClick={handleDoubleClick}
        />

        { !noConrtol && (!playing||muted) && 
        <div className={styles.VideoControls} >
          <div onClick={() => setPlaying(!playing)} style={{width:'36px', display:playing&&muted?'none':'block' }}>
          { playing?
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#FFFFFF"><path d="M620-220q-24.54 0-42.27-17.73Q560-255.46 560-280v-400q0-24.54 17.73-42.27Q595.46-740 620-740h30q24.54 0 42.27 17.73Q710-704.54 710-680v400q0 24.54-17.73 42.27Q674.54-220 650-220h-30Zm-310 0q-24.54 0-42.27-17.73Q250-255.46 250-280v-400q0-24.54 17.73-42.27Q285.46-740 310-740h30q24.54 0 42.27 17.73Q400-704.54 400-680v400q0 24.54-17.73 42.27Q364.54-220 340-220h-30Z"/></svg>
            :<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#FFFFFF"><path d="M340-302.23v-355.54q0-15.84 10.87-26 10.87-10.15 25.37-10.15 4.53 0 9.5 1.31 4.97 1.3 9.49 3.92l279.84 178.15q8.24 5.62 12.35 13.46 4.12 7.85 4.12 17.08 0 9.23-4.12 17.08-4.11 7.84-12.35 13.46L395.23-271.31q-4.53 2.62-9.52 3.92-4.98 1.31-9.51 1.31-14.51 0-25.35-10.15-10.85-10.16-10.85-26Z"/></svg>
          }
          </div>
          
          {/* 10s replay button 
          <svg onClick={replay10} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M368.46-506.15h-33.84q-10.34 0-17.09-6.76-6.76-6.75-6.76-17.07 0-10.33 6.76-17.1 6.75-6.77 17.09-6.77h57.69q10.33 0 17.09 6.76 6.75 6.76 6.75 17.09v180q0 10.33-6.75 17.09t-17.07 6.76q-10.33 0-17.1-6.76-6.77-6.76-6.77-17.09v-156.15Zm135.39 180q-17 0-28.5-11.5t-11.5-28.5v-147.7q0-17 11.5-28.5t28.5-11.5h75.38q17 0 28.5 11.5t11.5 28.5v147.7q0 17-11.5 28.5t-28.5 11.5h-75.38Zm12.3-47.7h50.77q2.31 0 3.47-1.15 1.15-1.15 1.15-3.46v-123.08q0-2.31-1.15-3.46-1.16-1.15-3.47-1.15h-50.77q-2.3 0-3.46 1.15-1.15 1.15-1.15 3.46v123.08q0 2.31 1.15 3.46 1.16 1.15 3.46 1.15ZM480.02-100q-70.79 0-132.63-26.77-61.85-26.77-107.85-72.77-46-46-72.77-107.83Q140-369.2 140-440q0-12.75 8.63-21.37 8.63-8.63 21.38-8.63 12.76 0 21.37 8.63Q200-452.75 200-440q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-10.62l42.47 42.46q8.92 8.93 8.8 20.89-.11 11.96-8.72 21.26-9.39 9.31-21.47 9.62-12.07.31-21.38-9l-89.92-90.31q-10.85-10.84-10.85-25.3 0-14.47 10.85-25.31L469.85-866q8.92-8.92 21.19-8.81 12.27.12 21.66 9.43 8.61 9.3 8.92 21.07.3 11.77-9 21.08L469.38-780H480q70.8 0 132.63 26.77t107.83 72.77q46 46 72.77 107.82Q820-510.81 820-440.02t-26.77 132.63q-26.77 61.85-72.77 107.85-46 46-107.82 72.77Q550.81-100 480.02-100Z"/></svg>
          */}
          {/* 10s forward button 
          <svg onClick={forward10} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480.02-100q-70.79 0-132.63-26.77-61.85-26.77-107.85-72.77-46-46-72.77-107.82Q140-369.19 140-439.98t26.77-132.63q26.77-61.85 72.77-107.85 46-46 107.83-72.77Q409.2-780 480-780h10.62l-43.24-43.23q-9.3-9.31-9-21.08.31-11.77 8.92-21.07 9.39-9.31 21.66-9.43 12.27-.11 21.19 8.81l90.69 90.31q10.85 10.84 10.85 25.31 0 14.46-10.85 25.3l-89.92 90.31q-9.31 9.31-21.38 9-12.08-.31-21.47-9.62-8.61-9.3-8.72-21.26-.12-11.96 8.8-20.89L490.62-720H480q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-12.75 8.63-21.37 8.63-8.63 21.38-8.63 12.76 0 21.37 8.63Q820-452.75 820-440q0 70.8-26.77 132.63t-72.77 107.83q-46 46-107.82 72.77Q550.81-100 480.02-100ZM368.46-506.15h-33.84q-10.34 0-17.09-6.76-6.76-6.75-6.76-17.07 0-10.33 6.76-17.1 6.75-6.77 17.09-6.77h57.69q10.33 0 17.09 6.76 6.75 6.76 6.75 17.09v180q0 10.33-6.75 17.09t-17.07 6.76q-10.33 0-17.1-6.76-6.77-6.76-6.77-17.09v-156.15Zm135.39 180q-17 0-28.5-11.5t-11.5-28.5v-147.7q0-17 11.5-28.5t28.5-11.5h75.38q17 0 28.5 11.5t11.5 28.5v147.7q0 17-11.5 28.5t-28.5 11.5h-75.38Zm12.3-47.7h50.77q2.31 0 3.47-1.15 1.15-1.15 1.15-3.46v-123.08q0-2.31-1.15-3.46-1.16-1.15-3.47-1.15h-50.77q-2.3 0-3.46 1.15-1.15 1.15-1.15 3.46v123.08q0 2.31 1.15 3.46 1.16 1.15 3.46 1.15Z"/></svg>
          */}
          <div style={{ display:'flex', justifyContent:'center', width:'36px' }} onClick={() => setMuted(!muted)}>
          {muted?
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M658.31-195.08q-9.85 6.23-20.08 11.85Q628-177.62 617.15-173q-11.15 5.08-23.19 0-12.04-5.08-16.5-16.85-4.46-11.15 1.31-22.19 5.77-11.04 16.92-16.11 5.16-2.39 9.81-4.77 4.65-2.39 9.42-5.54L471.54-381.85V-282q0 20.46-18.73 28.27-18.73 7.8-33.12-6.58L300-380H187.69q-15.46 0-25.8-10.35-10.35-10.34-10.35-25.81v-127.68q0-15.47 10.35-25.81Q172.23-580 187.69-580h85.7L100.92-752.46q-8.3-8.31-8.5-20.88-.19-12.58 8.5-21.27 8.7-8.7 21.08-8.7 12.39 0 21.08 8.7L800-137.69q8.31 8.31 8.5 20.88.19 12.58-8.5 21.27t-21.08 8.69q-12.38 0-21.07-8.69l-99.54-99.54ZM759.23-481q0-82.23-44.19-150.54-44.19-68.31-118.58-101.92-11.54-5.46-17-16.31-5.46-10.84-1.23-22 4.85-12.15 17.08-16.84 12.23-4.7 24.77.77 90.46 41.07 144.8 123.3 54.35 82.23 54.35 183.54 0 38.39-8.89 74.73-8.88 36.35-25.65 69.04-6.85 16.23-19.12 20-12.26 3.77-22.8-.08-10.54-3.84-16.35-13.77-5.81-9.92.27-22.3 16.39-29.46 24.46-60.97 8.08-31.5 8.08-66.65ZM594.46-609.15q28 21.38 42.54 58 14.54 36.61 14.54 71.15 0 8.85-.96 17.5-.97 8.65-3.5 17.12-2.77 11.46-13.81 14.5-11.04 3.03-19.89-5.81l-35.61-35.62q-5.62-5.61-8.23-12.15-2.62-6.54-2.62-13.77v-96.62q0-10.46 9.54-15.19 9.54-4.73 18 .89Zm-196.77-43.23q-5.61-5.62-5.42-12.85.19-7.23 5.81-12.84l21.61-21.62q14.39-14.38 33.12-6.58 18.73 7.81 18.73 28.27v55.69q0 12.47-11.04 17.27-11.04 4.81-19.89-4.42l-42.92-42.92Z"/></svg>
            :<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M753.85-481q0-82.62-44.2-150.73-44.19-68.12-118.57-101.73-11.54-5.46-17-16.31-5.46-10.84-1.23-22 4.84-12.15 17.07-16.84 12.23-4.7 24.77.77 90.46 41.07 144.81 123.61 54.34 82.54 54.34 183.23 0 100.69-54.34 183.23-54.35 82.54-144.81 123.61-12.54 5.47-24.77.77-12.23-4.69-17.07-16.84-4.23-11.16 1.23-22 5.46-10.85 17-16.31 74.38-33.61 118.57-101.73 44.2-68.11 44.2-150.73ZM294.62-380H182.31q-15.46 0-25.81-10.35-10.34-10.34-10.34-25.81v-127.68q0-15.47 10.34-25.81Q166.85-580 182.31-580h112.31l119.69-119.69q14.38-14.38 33.11-6.58 18.73 7.81 18.73 28.27v396q0 20.46-18.73 28.27-18.73 7.8-33.11-6.58L294.62-380Zm351.53-100q0 37.38-15.54 70.85-15.53 33.46-41.92 56.3-8.46 5.62-17.81 1.08-9.34-4.54-9.34-15v-228.46q0-10.46 9.34-15 9.35-4.54 17.81 1.08 26.39 23.46 41.92 57.61 15.54 34.16 15.54 71.54Z"/></svg>
          }
          </div>
          
          {/* 1x speed button */}
          <div className='noSelect'
            style={{ display:playing&&muted?'none':'block', fontSize:'1rem', fontWeight:600, letterSpacing:'-1px', color:'#fff', textAlign: 'center'}} 
            onClick={() => setPlayspeed((prevPlaySpeed) => Math.trunc(Math.max(8, (prevPlaySpeed*10+2) %20))/10 )}>
            {playspeed}{playspeed==1?"x":null}
          </div>

        </div>
    }
      
      </motion.div>
    );
  }
  