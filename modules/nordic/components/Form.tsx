'use client'

import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import style from './nordic.module.css';
import Text from '../../components/Text'; 
import TextEnter from '../../components/dialogue/TextEnter';
import { useEngages } from '../../../context/EngageContext';
import { useTrackingContext } from '../../../context/TrackingContext';
import { render } from '@/lib/render/render';
import getTechData from '@/lib/device/getTechData';
import { evaluateDecisionTree } from '@/lib/ml/DecisionTree';
import { log } from 'console';

export default function Form({ form }: { form: any; id: string } ) {

    const [ fromdata, setFormdata ] = useState<{ tree?: any; id?: string; data?: any[] } | null>(null);
    const [ tier, setTier] = useState<string | null>(null);
    const [ path, setPath] = useState<string[]>([form.id]);
    const [ warn, setWarn] = useState<string | null>(null);
    const { getEvent, isReady, logEvent } = useEngages();

    useEffect(() => {
      if( isReady ) {
        let path = getEvent?.(form.id).val ?? [form.id];
        setPath( path );
        let res = findElementById(form, path[path.length-1]);
        console.log('form', form, res, path);
        setFormdata(res);
      }
    }, [isReady]);

    useEffect(() => {
      const getTier = async () => {
        const techTier = (await getTechData()).techTier;
        setTier(techTier ?? null);
      };
      getTier();
    }, []);


    function findElementById(form:any, targetId:string) {

      if (typeof form !== 'object' || form === null) return null;
      if (form.id === targetId) return form;
    
      for (const key in form) {
        if (typeof form[key] === 'object') {
          const result:any = findElementById(form[key], targetId);
          if (result) return result;
        }
      }
    
      return null;
    }


    // to know what to questions are required
    function findQueries(obj: any, results: string[] = []) {
      if (typeof obj !== 'object' || obj === null) return results;
      if (obj.hasOwnProperty('query')) results.push(obj.query.id);
      for (const key in obj) 
        if (typeof obj[key] === 'object' && obj[key] !== null) 
          findQueries(obj[key], results);
      return results;
    }
    

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if( !form?.id || !form?.data ) return;

      setWarn(null);
      // to know what to questions are required
      let treeRequires = findQueries(fromdata?.tree??{});
      for (const element of fromdata?.data??[]) {
        let isRequired = element.id && ( treeRequires.includes(element.id) || (element.verify ?? false) );
        if ( isRequired ) {
          let verifyValue = getEvent?.(element.id);
          console.log(element.id, element.verify, verifyValue);
          if( !verifyValue?.['verified'] ) { 
            console.log('unverified', element.id, getEvent?.(element.id)); 
            setWarn(element.explanation??'Lütfen tüm alanları doldurun');
            return;
          }
        }
      }


      let res = evaluateDecisionTree(fromdata?.tree, getEvent);
      //for (const element of fromdata.data) logEvent(element.id);
      setPath(prevpath => {
        if(!res.id) return prevpath; 
        let update: string[] =  [...prevpath, res.id].filter((id): id is string => id !== undefined);
        logEvent({ ui:'form', id: form.id, act:'change', val:update, verified: fromdata?.tree? false : true });
        return update;
      });
  

      if (res.url) {
        //fetch content from server using url
      } else {
        let element = null;
        if( res.ui && res.ui == 'form' ) {
          setFormdata(res);
          element = document.getElementById(res.id);
        } else if ( Array.isArray(res) ) {
          setFormdata({data: res});
          element = document.getElementById(res[0].id);
        }
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start", 
          });
        }
      }

    }


  return fromdata?.id &&fromdata?.data &&( 
    <form id={fromdata.id} data-track onSubmit={(e) => handleNext(e)}>

      {path.length > 0 &&
      <div className='noSelect' onClick={() => {
        if(path.length < 2) return;
        let res = findElementById(form, path[path.length-2]);
        setFormdata(res);
        if(form.id) logEvent({ ui:'form', id: form.id, act:'change', val:path.slice(0, -1), verified: fromdata.tree? false : true });
        setPath(prevpath => prevpath.slice(0, -1));
      }}>back</div>}

      <div style={{ }}>
        { fromdata?.data?.map((e:any) => render(e)) }
      </div>

      {warn && <p>{warn}</p>}

    </form>
  );
}

/* ornek tree 

{
        "query": { "ui": "select", "id": "sec",  },
        "branches": [
          { "if":"/18 ve altı|18-24/", 
            "query": { "ui": "number", 'id': "kilo" }, 
            "branches": [
              {'if':60, 'leave': "call_sales_rep" },
              { 'if':98, 'leave': [
                { "id": "aciklama", "ui": "p", "text": "Bu bilgilerle, sana dönüş yapilacaktir", "style": { "maxWidth": "450px", "padding": "1rem", "marginBottom": "1rem" } },
              ] }
            ]
          },
          { "if": "/.* /<--- boslugu sil commeti bozdugu icin koydum",
          "query": { "ui": "input", "id": "kilo" }, 
          "branches": [
            { "if": "/ismail/", "leave": "call_support" },
            { "if": "/.* /<--- boslugu sil commeti bozdugu icin koydum", "leave": "show_info_page" }
          ]}
      ]
    }
    
  */