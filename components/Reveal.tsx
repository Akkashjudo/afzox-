'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal wrapper. Two tiers, both fail-safe by construction:
 *
 * Desktop (>=768px): this component's own IntersectionObserver logic
 * runs. Default (and server-rendered) state is fully VISIBLE; JS only
 * hides an element after confirming, on mount, that (a) IntersectionObserver
 * exists and (b) the element isn't already near the viewport. That
 * element then gets a 2.5s safety timeout that force-reveals it
 * regardless of whether the observer ever fires.
 *
 * Mobile (<768px): a global CSS rule in globals.css (`.reveal-el` inside
 * an `@media (max-width:767px)` block) overrides this component's inline
 * style with `!important` and plays a fast, zero-delay CSS keyframe
 * instead. That override is pure CSS — it has no dependency on this
 * component's JS, React hydration, or the observer ever running, so
 * mobile visibility cannot get stuck no matter what JS does or fails to
 * do. This two-tier split exists because a real device (WhatsApp's
 * in-app browser / iOS Safari WebView) showed whole below-the-fold
 * sections permanently stuck at opacity:0 under the JS-only version —
 * the failure mode for primary content must always be "just show it,
 * skip the animation," never "stay blank."
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
      { rootMargin: '0px 0px 120px 0px', threshold: 0.05 }
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
      className={className ? `reveal-el ${className}` : 'reveal-el'}
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
