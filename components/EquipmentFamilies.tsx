'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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
 * Primary product discovery, directly under the marquee.
 *
 * Six families, chosen from the catalogue rather than from a list of examples
 * — see lib/families.ts for why these six and not the 28 `category` ranges.
 * Each is a real filtered catalogue URL, so the explore link and a shared link
 * land on the same place, and the back button behaves.
 *
 * Laid out as a rail beside the results rather than a row of tiles above them.
 * The tile row read as a filter form: six small squares, then a heading, then
 * a grid — three stacked blocks with no apparent relationship. Side by side,
 * the selected family stays next to what it produced and the section reads as
 * one piece of merchandising.
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
  const reduce = useReducedMotion();
  const current = families.find((f) => f.slug === active) ?? families[0];
  const items = previews[active] ?? [];

  return (
    <section className="section bg-paper">
      <div className="shell">
        {/* ---------------- Section head ---------------- */}
        <div className="max-w-2xl">
          <span className="eyebrow">Find equipment</span>
          <h2 className="mt-4 text-display-sm font-bold tracking-tight text-ink-900">
            Six families. One floor.
          </h2>
          <p className="mt-5 max-w-prose text-body-lg text-on-surface-variant">
            Every machine AFZOX supplies sits in one of six families. Pick the one
            you&rsquo;re fitting out and work from there.
          </p>
        </div>

        {/* ---------------- Rail + results ---------------- */}
        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-12">
          {/* Family rail — a horizontal strip on small screens, a vertical
              list from `lg`. A real tablist: arrow keys move between families
              and only the selected tab is in the tab order. */}
          <div
            role="tablist"
            aria-label="Equipment families"
            className="no-scrollbar edge-fade-end -mx-margin-mobile flex gap-2 overflow-x-auto px-margin-mobile md:mx-0 md:px-0 lg:flex-col lg:gap-1 lg:overflow-visible"
          >
            {families.map((f, i) => {
              const selected = f.slug === active;
              return (
                <button
                  key={f.slug}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="family-preview"
                  tabIndex={selected ? 0 : -1}
                  onKeyDown={(e) => {
                    const keys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
                    if (!keys.includes(e.key)) return;
                    e.preventDefault();
                    const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
                    const nextIndex = (i + step + families.length) % families.length;
                    setActive(families[nextIndex].slug);
                    const siblings = e.currentTarget.parentElement?.querySelectorAll('button');
                    siblings?.[nextIndex]?.focus();
                  }}
                  onClick={() => setActive(f.slug)}
                  className={`group relative flex shrink-0 items-center gap-3 whitespace-nowrap rounded-lg py-3 pl-3.5 pr-4 text-left transition-colors duration-control ease-afzox lg:w-full lg:whitespace-normal ${
                    selected ? 'bg-white shadow-card' : 'hover:bg-white/70'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="family-marker"
                      aria-hidden
                      className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-brand"
                      transition={reduce ? { duration: 0 } : { duration: DUR.control, ease: EASE }}
                    />
                  )}
                  <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-md bg-paper-sunken lg:h-12 lg:w-12">
                    <Image
                      src={f.thumb}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-contain p-1.5 transition-transform duration-500 ease-afzox group-hover:scale-105"
                    />
                  </span>
                  <span
                    className={`block font-display text-sm font-semibold leading-tight ${
                      selected ? 'text-ink-900' : 'text-ink-900/70'
                    }`}
                  >
                    {f.name}
                  </span>
                  <IconArrow
                    className={`ml-auto hidden h-3.5 w-3.5 shrink-0 transition-opacity duration-control ease-afzox lg:block ${
                      selected
                        ? 'text-brand opacity-100'
                        : 'text-on-surface-variant opacity-0 group-hover:opacity-60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* ---------------- Results ---------------- */}
          <div id="family-preview" className="min-w-0">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-black/[0.08] pb-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.slug}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: DUR.control, ease: EASE }}
                  className="min-w-0"
                >
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink-900 lg:text-2xl">
                    {current.name}
                  </h3>
                  <p className="mt-1.5 max-w-prose text-body-sm text-on-surface-variant">
                    {current.blurb}
                  </p>
                </motion.div>
              </AnimatePresence>

              <Link href={current.href} className="group cta-text shrink-0">
                Explore {current.name.toLowerCase()}
                <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
              </Link>
            </div>

            <motion.div layout className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    layout
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{
                      duration: DUR.control,
                      ease: EASE,
                      delay: reduce ? 0 : Math.min(i * STAGGER.tight, 0.18),
                    }}
                  >
                    <Link
                      href={p.href}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-black/[0.08] bg-white transition-all duration-control ease-afzox hover:-translate-y-0.5 hover:border-black/20 hover:shadow-card"
                    >
                      <span className="relative block aspect-[4/3] w-full overflow-hidden bg-paper-sunken">
                        <Image
                          src={p.image}
                          alt={`AFZOX ${p.name}`}
                          fill
                          sizes="(max-width:640px) 46vw, (max-width:1280px) 30vw, 20vw"
                          className="object-contain p-4 transition-transform duration-500 ease-afzox group-hover:scale-[1.05]"
                        />
                      </span>
                      <span className="flex flex-1 flex-col gap-1 border-t border-black/[0.06] px-4 pb-4 pt-3">
                        <span className="text-label-sm uppercase text-brand">{p.series}</span>
                        <span className="font-display text-sm font-semibold leading-snug text-ink-900">
                          {p.name}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
