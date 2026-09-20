'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { DUR, EASE, STAGGER } from './motion/primitives';
import { IconArrow } from './icons';

export type FamilyCard = {
  slug: string;
  name: string;
  blurb: string;
  href: string;
  thumb: string;
  thumbAlt: string;
};

export type PreviewItem = {
  slug: string;
  name: string;
  series: string;
  category: string;
  image: string;
  href: string;
};

/**
 * Primary product discovery, directly under the hero.
 *
 * Six families, chosen from the catalogue rather than from a list of examples
 * — see lib/families.ts for why these six and not the 28 `category` ranges.
 * Each is a real filtered catalogue URL, so "view all" and a shared link land
 * on the same place, and the back button behaves.
 *
 * The preview is deliberately shallow: eight machines, then out to the
 * catalogue. Dumping 355 products under the fold would defeat the point of
 * having a discovery section at all.
 */
export default function EquipmentFamilies({
  families,
  previews,
}: {
  families: FamilyCard[];
  previews: Record<string, PreviewItem[]>;
}) {
  const [active, setActive] = useState(families[0]?.slug ?? '');
  const current = families.find((f) => f.slug === active) ?? families[0];
  const items = previews[active] ?? [];

  return (
    <section className="section bg-paper">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-xl">
            <span className="eyebrow">Find equipment</span>
            <h2 className="mt-4 text-display-sm font-bold tracking-tight text-ink-900">
              Start with what you&rsquo;re fitting out.
            </h2>
          </div>
          <Link href="/shop" className="group cta-text shrink-0">
            Browse all equipment
            <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ---------------- Family cards ---------------- */}
        <div
          role="tablist"
          aria-label="Equipment families"
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4"
        >
          {families.map((f) => {
            const selected = f.slug === active;
            return (
              <button
                key={f.slug}
                role="tab"
                aria-selected={selected}
                aria-controls="family-preview"
                onClick={() => setActive(f.slug)}
                className={`group relative flex flex-col overflow-hidden rounded-xl border text-left transition-colors duration-control ease-afzox ${
                  selected
                    ? 'border-brand bg-white shadow-card'
                    : 'border-black/[0.08] bg-white hover:border-black/20'
                }`}
              >
                <span className="relative block aspect-[4/3] w-full overflow-hidden bg-paper-sunken">
                  <Image
                    src={f.thumb}
                    alt={f.thumbAlt}
                    fill
                    sizes="(max-width:640px) 46vw, (max-width:1024px) 30vw, 15vw"
                    className="object-contain p-3 transition-transform duration-500 ease-afzox group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex flex-1 flex-col gap-0.5 px-3 pb-3 pt-2.5">
                  <span className="font-display text-[13px] font-semibold leading-tight text-ink-900 lg:text-sm">
                    {f.name}
                  </span>
                </span>
                {selected && (
                  <motion.span
                    layoutId="family-underline"
                    className="absolute inset-x-0 bottom-0 h-[3px] bg-brand"
                    transition={{ duration: DUR.control, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ---------------- Preview ---------------- */}
        <div id="family-preview" className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-black/[0.08] pb-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink-900">{current.name}</h3>
              <p className="mt-1 max-w-prose text-body-sm text-on-surface-variant">
                {current.blurb}
              </p>
            </div>
            <Link href={current.href} className="group cta-text shrink-0">
              View all
              <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
            </Link>
          </div>

          <motion.div
            layout
            className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: DUR.control,
                    ease: EASE,
                    delay: Math.min(i * STAGGER.tight, 0.18),
                  }}
                >
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-black/[0.08] bg-white transition-colors duration-control hover:border-black/20"
                  >
                    <span className="relative block aspect-[4/3] w-full overflow-hidden bg-paper-sunken">
                      <Image
                        src={p.image}
                        alt={`AFZOX ${p.name}`}
                        fill
                        sizes="(max-width:640px) 46vw, (max-width:1024px) 30vw, 22vw"
                        className="object-contain p-4 transition-transform duration-500 ease-afzox group-hover:scale-[1.04]"
                      />
                    </span>
                    <span className="flex flex-1 flex-col gap-1 px-4 pb-4 pt-3">
                      <span className="text-label-sm uppercase text-brand">{p.series}</span>
                      <span className="font-display text-sm font-semibold leading-snug text-ink-900">
                        {p.name}
                      </span>
                      <span className="mt-auto pt-2 text-label-sm uppercase text-on-surface-variant">
                        {p.category}
                      </span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
