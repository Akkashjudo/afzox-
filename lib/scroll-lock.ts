import type Lenis from 'lenis';

/**
 * Page scroll locking, shared by every overlay (mobile menu, filter drawer).
 *
 * Two problems this solves that a bare `document.body.style.overflow` did not:
 *
 *  1. Lenis scrolls the window programmatically on every frame, so
 *     `overflow: hidden` on the body does not stop it — the page kept moving
 *     behind an open overlay. The lock has to call `lenis.stop()` too.
 *
 *  2. Two components could both write `body.style.overflow`. Whichever
 *     unmounted first cleared the lock while the other still wanted it. The
 *     count below means the lock only lifts when the last holder releases it.
 */

let lenisInstance: Lenis | null = null;
let locks = 0;
let previousOverflow = '';

/** Called once by SmoothScroll so locks can pause the smooth-scroll loop. */
export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function lockScroll() {
  locks += 1;
  if (locks > 1) return; // already held by another overlay
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  lenisInstance?.stop();
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks > 0) return; // someone else still holds it
  document.body.style.overflow = previousOverflow;
  lenisInstance?.start();
}

/** Convenience for `useEffect` bodies: locks while `active`, releases on cleanup. */
export function applyScrollLock(active: boolean) {
  if (!active) return undefined;
  lockScroll();
  return unlockScroll;
}
