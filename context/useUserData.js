// hooks/useUserData.js
import { useState, useEffect } from 'react';
import { detect } from 'detect-browser';

const useUserData = () => {

  const [userData, setUserData] = useState({
    loading: true,
    error: null,
    data: null
  });

  useEffect(() => {
    const gatherUserData = async () => {
      try {
        // Basic device/browser info
        const browser = detect();
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        
        // Screen info
        const screen = {
          width: window.screen.width,
          height: window.screen.height,
          colorDepth: window.screen.colorDepth,
          orientation: window.screen.orientation?.type
        };

        // Time info
        const now = new Date();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Network info
        let ipData = {};
        try {
          const ipResponse = await fetch('https://ipapi.co/json/');
          ipData = await ipResponse.json();
        } catch (ipError) {
          console.warn('IP detection failed:', ipError);
        }

        // Device capabilities
        const capabilities = {
          touch: 'ontouchstart' in window,
          cookies: navigator.cookieEnabled,
          javascript: true,
          localStorage: 'localStorage' in window,
          sessionStorage: 'sessionStorage' in window,
          pdf: 'application/pdf' in navigator.mimeTypes,
          webgl: (() => {
            try {
              const canvas = document.createElement('canvas');
              return !!window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
            } catch (e) {
              return false;
            }
          })()
        };

        // Battery status (requires permission in some browsers)
        const battery = 'getBattery' in navigator 
          ? await navigator.getBattery().catch(() => null)
          : null;

        // Connection info
        const connection = navigator.connection ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
          saveData: navigator.connection.saveData
        } : null;

        const data = {
          browser: {
            name: browser?.name,
            version: browser?.version,
            os: browser?.os,
            mobile: isMobile,
            userAgent: navigator.userAgent
          },
          screen,
          time: {
            local: now.toString(),
            timezone,
            offset: now.getTimezoneOffset(),
            timestamp: Date.now()
          },
          location: {
            ip: ipData.ip,
            city: ipData.city,
            region: ipData.region,
            country: ipData.country_name,
          },
          capabilities,
          battery,
          connection,
          languages: navigator.languages,
          platform: navigator.platform,
          hardware: {
            cores: navigator.hardwareConcurrency || 'unknown',
            memory: navigator.deviceMemory || 'unknown'
          }
        };

        setUserData({ loading: false, data, error: null });
      } catch (error) {
        setUserData({ loading: false, data: null, error: error.message });
      }
    };

    gatherUserData();
  }, []);

  return userData;
};

export default useUserData;
