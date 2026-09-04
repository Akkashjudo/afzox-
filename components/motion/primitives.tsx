'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { MotionProps, Variants } from 'framer-motion';

/* =========================================================================
   AFZOX motion system.

   One timing vocabulary for the whole site so nothing invents its own.
   Every primitive here degrades to "just show the content" when the visitor
   has asked for reduced motion — the content is never gated behind an
   animation that may not run.
   ========================================================================= */

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_IN = [0.55, 0, 0.45, 1] as const;

export const DUR = {
  micro: 0.2,
  control: 0.32,
  section: 0.56,
  cinematic: 0.9,
} as const;

/** Stagger steps. Kept short — a slow cascade reads as lag, not polish. */
export const STAGGER = {
  tight: 0.04,
  normal: 0.07,
  loose: 0.11,
} as const;

/* ------------------------------------------------------------------ *
 * RevealText — line-by-line mask reveal for headings.
 *
 * Each line sits in an overflow-hidden row and rises into place, which
 * reads far more considered than a whole-block fade. Pass short lines;
 * this is for headlines, not paragraphs.
 * ------------------------------------------------------------------ */
export function RevealText({
  lines,
  as: Tag = 'h2',
  className,
  lineClassName,
  delay = 0,
  once = true,
}: {
  lines: React.ReactNode[];
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  className?: string;
  lineClassName?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '0px 0px -12% 0px' });
  const reduce = useReducedMotion();
  const show = reduce || inView;

  return (
    <Tag className={className}>
      <span ref={ref} className="block">
        {lines.map((line, i) => (
          <span key={i} className={`block overflow-hidden ${lineClassName ?? ''}`}>
            <motion.span
              className="block will-change-transform"
              initial={reduce ? false : { y: '108%' }}
              animate={show ? { y: '0%' } : { y: '108%' }}
              transition={{ duration: DUR.cinematic, ease: EASE, delay: delay + i * 0.075 }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * RevealImage — clip-path curtain reveal with a slow settle.
 *
 * The image starts slightly overscaled and eases back as the curtain
 * opens, so the reveal has depth rather than just appearing.
 * ------------------------------------------------------------------ */
export function RevealImage({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const show = reduce || inView;

  const closed = {
    up: 'inset(100% 0% 0% 0%)',
    down: 'inset(0% 0% 100% 0%)',
    left: 'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
  }[direction];

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full will-change-transform"
        initial={reduce ? false : { clipPath: closed, scale: 1.08 }}
        animate={show ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 } : { clipPath: closed, scale: 1.08 }}
        transition={{ duration: DUR.cinematic, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * StaggerGroup / StaggerItem — for card grids, nav lists, stat rows.
 * ------------------------------------------------------------------ */
const groupVariants: Variants = {
  hidden: {},
  show: (step: number) => ({ transition: { staggerChildren: step } }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.section, ease: EASE } },
};

export function StaggerGroup({
  children,
  className,
  step = STAGGER.normal,
  once = true,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
  once?: boolean;
} & MotionProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      custom={step}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Parallax — scroll-linked Y drift, spring-smoothed.
 *
 * `distance` is deliberately small. Anything past ~80px starts to feel
 * like the page is sliding apart rather than breathing. Disabled entirely
 * under reduced motion and on the narrow breakpoint via `disabled`.
 * ------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
  distance = 48,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  if (reduce || disabled) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * CountUp — animates to a number once, on entry.
 *
 * Only ever fed real values from the catalogue. Renders the final number
 * immediately under reduced motion so the figure is never withheld.
 * ------------------------------------------------------------------ */
export function CountUp({
  to,
  suffix = '',
  className,
  duration = 1.4,
}: {
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span ref={ref} className={className}>
        {to}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      <motion.span
        initial={{ opacity: 1 }}
        animate={inView ? 'run' : 'idle'}
        variants={{
          idle: {},
          run: {},
        }}
      >
        <Counter to={to} run={inView} duration={duration} />
      </motion.span>
      {suffix}
    </span>
  );
}

function Counter({ to, run, duration }: { to: number; run: boolean; duration: number }) {
  const mv = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());
  if (run) mv.set(to);
  return <motion.span>{rounded}</motion.span>;
}

/* ------------------------------------------------------------------ *
 * Magnetic — a CTA that leans very slightly toward the cursor.
 *
 * Pointer-driven only, so it is inert on touch. The pull is capped at a
 * few pixels: enough to feel alive, not enough to make the target harder
 * to hit.
 * ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className,
  strength = 0.18,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.3 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.3 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set(Math.max(-10, Math.min(10, (e.clientX - (r.left + r.width / 2)) * strength)));
        y.set(Math.max(-8, Math.min(8, (e.clientY - (r.top + r.height / 2)) * strength)));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
