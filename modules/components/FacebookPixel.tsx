'use client'
import { useEffect } from 'react';

export default function FacebookPixel() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if fbq already exists
      if (!window.fbq) {
        const fbq: Fbq = function () {
          // Convert IArguments to a proper array
          const args = Array.prototype.slice.call(arguments);

          if (window.fbq?.callMethod) {
            window.fbq.callMethod.apply(window.fbq, args);
          } else {
            window.fbq?.queue?.push(args);
          }
        };

        // Assign fbq and _fbq to the window object
        window.fbq = fbq;
        window.fbq.queue = [];
        window.fbq.loaded = true;
        window.fbq.version = '2.0';

        // Create and insert the Facebook Pixel script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode?.insertBefore(script, firstScript);

        // Initialize Facebook Pixel with your Pixel ID
        window.fbq('init', '563456096339972');
        window.fbq('track', 'PageView');
      } else {
        // If fbq already exists, just track the page view
        window.fbq('track', 'PageView');
      }
    }
  }, []);

  return (
    <>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=563456096339972&ev=PageView&noscript=1"
          alt="facebook pixel"
        />
      </noscript>
    </>
  );
}
