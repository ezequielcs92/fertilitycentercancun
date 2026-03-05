'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __lc?: {
      license?: number;
      integration_name?: string;
      product_name?: string;
      asyncInit?: boolean;
    };
    LiveChatWidget?: {
      _q?: unknown[];
      _h?: ((args: unknown[]) => void) | null;
      _v?: string;
      on?: (...args: unknown[]) => void;
      once?: (...args: unknown[]) => void;
      off?: (...args: unknown[]) => void;
      get?: (...args: unknown[]) => void;
      call?: (...args: unknown[]) => void;
      init?: () => void;
    };
  }
}

const LIVECHAT_LICENSE = 10113817;
const WHATSAPP_URL = 'https://wa.me/5219983050373';

function loadOriginalLiveChat() {
  if (document.querySelector('script[src="https://cdn.livechatinc.com/tracking.js"]')) return;

  const n = window;
  const t = document;
  const c = Array.prototype.slice;

  const widget: NonNullable<Window['LiveChatWidget']> = {
    _q: [],
    _h: null,
    _v: '2.0',
    on: function (...args: unknown[]) {
      widget._h ? widget._h(['on', c.call(args)]) : widget._q?.push(['on', c.call(args)]);
    },
    once: function (...args: unknown[]) {
      widget._h ? widget._h(['once', c.call(args)]) : widget._q?.push(['once', c.call(args)]);
    },
    off: function (...args: unknown[]) {
      widget._h ? widget._h(['off', c.call(args)]) : widget._q?.push(['off', c.call(args)]);
    },
    get: function (...args: unknown[]) {
      widget._h ? widget._h(['get', c.call(args)]) : widget._q?.push(['get', c.call(args)]);
    },
    call: function (...args: unknown[]) {
      widget._h ? widget._h(['call', c.call(args)]) : widget._q?.push(['call', c.call(args)]);
    },
    init: function () {
      const script = t.createElement('script');
      script.async = true;
      script.type = 'text/javascript';
      script.src = 'https://cdn.livechatinc.com/tracking.js';
      t.head.appendChild(script);
    },
  };

  if (!n.__lc?.asyncInit) {
    widget.init?.();
  }

  n.LiveChatWidget = n.LiveChatWidget || widget;
}

export default function FloatingContactButtons() {
  const [whatsAppPosition, setWhatsAppPosition] = useState<{ right?: string; bottom?: string; left?: string; top?: string }>({
    right: '1.5rem',
    bottom: '6rem',
  });

  useEffect(() => {
    window.__lc = window.__lc || {};
    window.__lc.license = LIVECHAT_LICENSE;
    window.__lc.integration_name = 'manual_channels';
    window.__lc.product_name = 'livechat';
    loadOriginalLiveChat();
  }, []);

  useEffect(() => {
    const updateAlignment = () => {
      const launcher = document.querySelector<HTMLElement>(
        'iframe#chat-widget-minimized, iframe[name="chat-widget-minimized"], iframe[id*="chat-widget-minimized"], iframe[name*="chat-widget-minimized"], [id*="chat-widget-minimized"], [id*="lc-chat-widget-minimized"]'
      );

      if (!launcher) return;

      const rect = launcher.getBoundingClientRect();
      const buttonSize = 56;
      const gap = 16;
      const left = rect.left + (rect.width - buttonSize) / 2;
      const top = rect.top - buttonSize - gap;

      setWhatsAppPosition({
        left: `${Math.max(8, left)}px`,
        top: `${Math.max(8, top)}px`,
      });
    };

    updateAlignment();

    const observer = new MutationObserver(updateAlignment);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    window.addEventListener('resize', updateAlignment);

    const interval = window.setInterval(updateAlignment, 800);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateAlignment);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed z-[80]" style={whatsAppPosition}>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 transition-transform"
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="h-9 w-9"
        >
          <path fill="#FFFFFF" d="M23.41 8.58A9.89 9.89 0 0 0 16.37 5.7c-5.47 0-9.92 4.45-9.92 9.92 0 1.74.46 3.44 1.33 4.95L6.37 25.3l4.84-1.27a9.92 9.92 0 0 0 5.15 1.42h.01c5.47 0 9.92-4.45 9.92-9.92 0-2.65-1.03-5.13-2.88-6.95Zm-7.04 15.2h-.01a8.26 8.26 0 0 1-4.2-1.16l-.3-.18-2.88.76.77-2.81-.19-.29a8.26 8.26 0 0 1-1.27-4.4c0-4.56 3.72-8.28 8.29-8.28 2.21 0 4.29.86 5.85 2.43a8.22 8.22 0 0 1 2.43 5.86c0 4.56-3.72 8.27-8.28 8.27Zm4.54-6.2c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.12-.56.12-.16.25-.63.8-.77.96-.14.16-.28.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.36-1.7-.14-.25-.01-.38.11-.5.11-.1.25-.27.37-.41.12-.14.16-.24.25-.4.08-.16.04-.3-.02-.42-.06-.12-.56-1.35-.76-1.85-.2-.48-.4-.42-.56-.43l-.47-.01c-.16 0-.42.06-.64.3-.22.25-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.7 2.6 4.12 3.64.57.25 1.02.39 1.37.5.57.18 1.1.16 1.51.1.46-.07 1.47-.6 1.68-1.14.21-.54.21-1.01.14-1.1-.06-.1-.23-.16-.48-.29Z" />
        </svg>
      </a>
    </div>
  );
}
