import Image from 'next/image';
import Link from 'next/link';
import { whatsAppLink } from '@/lib/catalogue';
import type { Product } from '@/lib/types';
import { IconArrow, IconShield } from './icons';

/**
 * Server Component — no 'use client', no Framer Motion, no scroll-reveal.
 * This is the LCP-critical section: the headline, CTA and hero image must
 * be present and fully visible (opacity 1, no transform offset) in the
 * server-rendered HTML on the very first paint, before any JS runs.
 *
 * On mobile the sections stack as copy -> visual -> stats (not copy -> stats
 * -> visual): the stats grid used to sit between the buttons and the image,
 * pushing the image below the fold on real phones. `lg:` grid placement
 * restores the original two-column composition on desktop, where that
 * ordering never mattered.
 */
export default function Hero({ heroProduct, stats }: { heroProduct: Product; stats: { icon: React.ReactNode; value: string; label: string }[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Ambient brand-colour glow — plain CSS, no JS, never hides content beneath it */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="ambient-glow absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-primary/[0.09] blur-[110px]" />
        <div className="ambient-glow absolute -right-32 top-10 h-[460px] w-[460px] rounded-full bg-tertiary/[0.07] blur-[100px]" />
        <div className="hero-grid absolute inset-0 opacity-[0.35]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="shell grid grid-cols-1 gap-10 pb-16 pt-4 md:gap-12 md:pb-24 md:pt-10 lg:grid-cols-[1.08fr_1fr] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-8 lg:gap-y-8 lg:pb-28">
        {/* ---------- COPY (headline, text, CTA) ---------- */}
        <div className="lg:col-start-1 lg:row-start-1">
          <span className="eyebrow">Manufactured in India &middot; Installed nationwide</span>
          <h1 className="mt-5 text-balance text-display-lg md:mt-6">
            Build Elite Gyms With <span className="relative text-primary sm:whitespace-nowrap">Professional Equipment</span>
          </h1>
          <p className="mt-4 max-w-lg text-body-lg text-on-surface-variant md:mt-6">
            Structural-steel machines engineered for floors that never close — plate loaded
            stations, selectorized circuits, racks and studio cardio, specified and installed
            by the people who build them.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 md:mt-9">
            <Link href="/shop" className="btn btn-primary group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                View Catalogue <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </Link>
            <a href={whatsAppLink()} target="_blank" rel="noopener" className="btn btn-ghost">
              Talk to Sales
            </a>
          </div>
        </div>

        {/* ---------- VISUAL — the LCP element, visible immediately ---------- */}
        <div className="relative lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
          <div className="animate-float relative mx-auto aspect-[4/4.3] w-full max-w-[480px] overflow-hidden rounded-[2rem] border border-black/5 bg-gradient-to-br from-surface via-surface-container-low to-surface-container shadow-card-hover">
            <Image
              src={heroProduct.image}
              alt={`${heroProduct.name} — AFZOX commercial gym equipment`}
              fill
              priority
              sizes="(max-width:1024px) 80vw, 480px"
              className="object-contain p-9"
            />
          </div>

          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-black/5 bg-white/95 p-3.5 pr-5 shadow-card-hover backdrop-blur sm:-left-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <IconShield className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-extrabold leading-tight tracking-tight">Lifetime</span>
              <span className="block text-[11px] text-on-surface-variant">Frame warranty</span>
            </span>
          </div>

          <div className="absolute -right-2 top-6 rounded-2xl border border-black/5 bg-white/95 px-4 py-2.5 shadow-card-hover backdrop-blur sm:-right-5">
            <span className="block text-[11px] font-bold uppercase tracking-widest text-primary">{heroProduct.categoryName}</span>
            <span className="block text-sm font-semibold">{heroProduct.name}</span>
          </div>
        </div>

        {/* ---------- STATS — lowest priority, renders after the image on mobile ---------- */}
        <div className="grid grid-cols-3 gap-3 sm:max-w-md lg:col-start-1 lg:row-start-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-black/5 bg-surface px-3 py-4 text-center sm:text-left sm:px-4">
              <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary sm:mx-0">
                {s.icon}
              </span>
              <span className="mt-2 block text-xl font-extrabold tracking-tight">{s.value}</span>
              <span className="block text-[11px] leading-tight text-on-surface-variant">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
