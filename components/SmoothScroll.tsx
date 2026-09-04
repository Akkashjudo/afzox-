'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { registerLenis } from '@/lib/scroll-lock';

/**
 * Smooth scroll — desktop pointer devices only.
 *
 * Deliberately narrow in scope, because the failure modes of a hijacked
 * scroll are worse than the benefit:
 *
 *  - Touch devices keep native scrolling entirely. Momentum scrolling on iOS
 *    and Android is already good, and overriding it costs responsiveness and
 *    fights pull-to-refresh and address-bar collapse.
 *  - `prefers-reduced-motion` disables it outright.
 *  - The easing is short and `wheelMultiplier` is 1, so the page never feels
 *    slow — it only removes the step between wheel ticks.
 *
 * Two things about Lenis that are easy to get wrong, both handled here:
 *
 *  1. While Lenis is running, `window.scrollTo()` does nothing — Lenis holds
 *     its own scroll position and reasserts it on the next frame. Anything
 *     that needs to move the page must go through `lenis.scrollTo()`.
 *  2. `document.body.style.overflow = 'hidden'` does not stop it either, for
 *     the same reason. Overlays lock the page through lib/scroll-lock, which
 *     calls `lenis.stop()`.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1,
      smoothWheel: true,
      // Never take over touch input.
      syncTouch: false,
    });
    registerLenis(lenis);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // In-page anchors go through Lenis so they land smoothly and in sync.
    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -96 });
    };
    document.addEventListener('click', onAnchorClick);

    // Route changes reset the page through Lenis, not window.scrollTo — the
    // latter is inert while Lenis owns the scroll, which would leave every
    // client-side navigation opening part-way down the new page.
    const onRouteReset = () => lenis.scrollTo(0, { immediate: true });
    window.addEventListener('afzox:route-change', onRouteReset);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      window.removeEventListener('afzox:route-change', onRouteReset);
      cancelAnimationFrame(raf);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Fires for Lenis when it is running; the plain scrollTo covers touch and
    // reduced-motion visitors, where Lenis is never created.
    window.dispatchEvent(new Event('afzox:route-change'));
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
