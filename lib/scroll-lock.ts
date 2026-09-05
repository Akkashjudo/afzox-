import type Lenis from 'lenis';

/**
 * Page scroll locking, shared by every overlay (mobile menu, filter drawer).
 *
 * Three problems this solves that a bare `document.body.style.overflow` did not:
 *
 *  1. Lenis scrolls the window programmatically on every frame, so
 *     `overflow: hidden` on the body does not stop it — the page kept moving
 *     behind an open overlay. The lock has to call `lenis.stop()` too.
 *
 *  2. iOS Safari ignores `overflow: hidden` on the body outright: the page
 *     behind an open menu still scrolls under your finger, and when the menu
 *     closes the reader is somewhere else entirely. The only thing that holds
 *     on iOS is pinning the body with `position: fixed`, which collapses the
 *     scroll offset to zero — so the offset is saved on lock and restored on
 *     release, through Lenis as well as the window (`window.scrollTo` alone is
 *     inert while Lenis owns the scroll).
 *
 *  3. Two components could both write `body.style.overflow`. Whichever
 *     unmounted first cleared the lock while the other still wanted it. The
 *     count below means the lock only lifts when the last holder releases it.
 */

let lenisInstance: Lenis | null = null;
let locks = 0;
let savedScrollY = 0;
let previous: { overflow: string; position: string; top: string; width: string } | null = null;

/** Called once by SmoothScroll so locks can pause the smooth-scroll loop. */
export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function lockScroll() {
  locks += 1;
  if (locks > 1) return; // already held by another overlay

  const body = document.body;
  savedScrollY = window.scrollY;
  previous = {
    overflow: body.style.overflow,
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
  };

  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${savedScrollY}px`;
  body.style.width = '100%';
  lenisInstance?.stop();
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks > 0) return; // someone else still holds it

  const body = document.body;
  if (previous) {
    body.style.overflow = previous.overflow;
    body.style.position = previous.position;
    body.style.top = previous.top;
    body.style.width = previous.width;
    previous = null;
  }

  // Un-pinning the body dropped the page back to the top. Put the reader where
  // they were, through both paths: the plain call covers touch and reduced
  // motion, `lenis.scrollTo` covers desktop where Lenis owns the position.
  lenisInstance?.start();
  window.scrollTo(0, savedScrollY);
  lenisInstance?.scrollTo(savedScrollY, { immediate: true });
}

/** Convenience for `useEffect` bodies: locks while `active`, releases on cleanup. */
export function applyScrollLock(active: boolean) {
  if (!active) return undefined;
  lockScroll();
  return unlockScroll;
}
