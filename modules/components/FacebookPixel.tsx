'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname for navigation tracking

export default function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.fbq) {
        const fbq: Fbq = function () {
          const args = Array.prototype.slice.call(arguments);
          if (window.fbq?.callMethod) {
            window.fbq.callMethod.apply(window.fbq, args);
          } else {
            window.fbq?.queue?.push(args);
          }
        };

        window.fbq = fbq;
        window.fbq.queue = [];
        window.fbq.loaded = true;
        window.fbq.version = '2.0';

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode?.insertBefore(script, firstScript);

        window.fbq('init', '563456096339972'); // Replace with your Pixel ID
      }

      // Track the page view
      //window.fbq('track', 'PageView');
    }
  }, [pathname]); // Dependency array includes pathname to trigger on page changes

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
