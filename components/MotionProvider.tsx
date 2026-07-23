'use client';

import { MotionConfig } from 'framer-motion';

/** Makes every Framer Motion animation site-wide (Header, Hero, ShopExplorer,
 *  WhatsAppFloat) honour the visitor's OS-level "reduce motion" setting —
 *  transforms/opacity still change, but instantly instead of animating. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
