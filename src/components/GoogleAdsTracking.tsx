'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const ADS_ID = 'AW-984765742';
const CONVERSION_WA = 'AW-984765742/bVsUCIn79LYaEK6qydUD';
const CONVERSION_LLAMADA = 'AW-984765742/h1aNCI2WjrIbEK6qydUD';

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
        gtag_report_conversion_wa: (url?: string) => boolean;
        gtag_report_conversion_llamada: (url?: string) => boolean;
        gtagSendEvent: (url?: string) => boolean;
    }
}

const GTAG_SNIPPETS = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${ADS_ID}');

function gtag_report_conversion_wa(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': '${CONVERSION_WA}',
      'event_callback': callback
  });
  return false;
}
window.gtag_report_conversion_wa = gtag_report_conversion_wa;

function gtag_report_conversion_llamada(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': '${CONVERSION_LLAMADA}',
      'event_callback': callback
  });
  return false;
}
window.gtag_report_conversion_llamada = gtag_report_conversion_llamada;

function gtagSendEvent(url) {
  var callback = function () {
    if (typeof url === 'string') {
      window.location = url;
    }
  };
  gtag('event', 'gracias_general', {
    'event_callback': callback,
    'event_timeout': 2000
  });
  return false;
}
window.gtagSendEvent = gtagSendEvent;
`;

export default function GoogleAdsTracking() {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as Element | null;
            const anchor = target?.closest?.('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href') ?? '';
            if (href.startsWith('tel:')) {
                if (typeof window.gtag_report_conversion_llamada === 'function') {
                    window.gtag_report_conversion_llamada();
                }
            } else if (/wa\.me|whatsapp\.com/.test(href)) {
                if (typeof window.gtag_report_conversion_wa === 'function') {
                    window.gtag_report_conversion_wa();
                }
            }
        };

        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, []);

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
                strategy="afterInteractive"
            />
            <Script id="gtag-ads-conversions" strategy="afterInteractive">
                {GTAG_SNIPPETS}
            </Script>
        </>
    );
}