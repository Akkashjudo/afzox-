'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { whatsAppLink } from '@/lib/catalogue';
import type { Product } from '@/lib/types';
import { IconArrow, IconShield } from './icons';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero({ heroProduct, stats }: { heroProduct: Product; stats: { icon: React.ReactNode; value: string; label: string }[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Ambient brand-colour glow, restrained and premium — not a busy pattern */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-primary/[0.09] blur-[110px]" />
        <div className="absolute -right-32 top-10 h-[460px] w-[460px] rounded-full bg-tertiary/[0.07] blur-[100px]" />
        <div className="hero-grid absolute inset-0 opacity-[0.35]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="shell grid grid-cols-1 items-center gap-12 pb-16 pt-6 md:pb-24 md:pt-10 lg:grid-cols-[1.08fr_1fr] lg:gap-8 lg:pb-28">
        {/* ---------- COPY ---------- */}
        <div>
          <Reveal>
            <span className="eyebrow">Manufactured in India &middot; Installed nationwide</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 text-balance text-display-lg">
              Build Elite Gyms With <span className="relative text-primary sm:whitespace-nowrap">Professional Equipment</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
              Structural-steel machines engineered for floors that never close — plate loaded
              stations, selectorized circuits, racks and studio cardio, specified and installed
              by the people who build them.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-9 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-primary group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                View Catalogue <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </Link>
            <a href={whatsAppLink()} target="_blank" rel="noopener" className="btn btn-ghost">
              Talk to Sales
            </a>
          </Reveal>

          <Reveal delay={0.26} className="mt-11 grid grid-cols-3 gap-3 sm:max-w-md">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-black/5 bg-surface px-3 py-4 text-center sm:text-left sm:px-4">
                <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary sm:mx-0">
                  {s.icon}
                </span>
                <span className="mt-2 block text-xl font-extrabold tracking-tight">{s.value}</span>
                <span className="block text-[11px] leading-tight text-on-surface-variant">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        {/* ---------- VISUAL ---------- */}
        <Reveal delay={0.16} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="relative mx-auto aspect-[4/4.3] w-full max-w-[480px] overflow-hidden rounded-[2rem] border border-black/5 bg-gradient-to-br from-surface via-surface-container-low to-surface-container shadow-card-hover"
          >
            <Image
              src={heroProduct.image}
              alt={`${heroProduct.name} — AFZOX commercial gym equipment`}
              fill
              priority
              sizes="(max-width:1024px) 80vw, 480px"
              className="animate-float object-contain p-9"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-black/5 bg-white/95 p-3.5 pr-5 shadow-card-hover backdrop-blur sm:-left-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <IconShield className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-extrabold leading-tight tracking-tight">Lifetime</span>
              <span className="block text-[11px] text-on-surface-variant">Frame warranty</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease }}
            className="absolute -right-2 top-6 rounded-2xl border border-black/5 bg-white/95 px-4 py-2.5 shadow-card-hover backdrop-blur sm:-right-5"
          >
            <span className="block text-[11px] font-bold uppercase tracking-widest text-primary">{heroProduct.categoryName}</span>
            <span className="block text-sm font-semibold">{heroProduct.name}</span>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
