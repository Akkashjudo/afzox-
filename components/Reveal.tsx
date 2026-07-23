'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal wrapper — plain CSS transition driven by a single shared
 * IntersectionObserver, not Framer Motion.
 *
 * Fail-safe by construction: the default (and the server-rendered) state
 * is fully VISIBLE. JS only ever hides an element after confirming, on
 * mount, that (a) IntersectionObserver exists and (b) the element is not
 * already inside or near the viewport. That element then gets a 2.5s
 * safety timeout that force-reveals it regardless of the observer ever
 * firing. This was rewritten after a real device (WhatsApp's in-app
 * browser / iOS Safari WebView) showed whole below-the-fold sections
 * permanently stuck at opacity:0 — the previous "hidden by default,
 * shown once JS confirms visibility" logic fails open into a blank page
 * on any JS/observer hiccup. This version fails open into "just show it,
 * skip the animation" instead, which is the only acceptable failure mode
 * for primary page content.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const rect = el.getBoundingClientRect();
    const alreadyNearViewport = rect.top < window.innerHeight * 1.05 && rect.bottom > 0;
    if (alreadyNearViewport) return; // don't hide something already on screen

    setHidden(true);

    const reveal = () => setHidden(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    io.observe(el);

    // Safety net: some mobile WebViews fire IntersectionObserver
    // unreliably. Never let an element stay hidden indefinitely.
    const timeout = setTimeout(reveal, 2500);

    return () => {
      io.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${y}px)` : 'translateY(0)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: hidden ? 'opacity, transform' : 'auto',
      }}
    >
      {children}
    </div>
  );
}
