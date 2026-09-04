'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { RevealText } from './motion/primitives';
import { IconArrow } from './icons';

/**
 * Featured equipment as a horizontal rail rather than another 4-up grid.
 *
 * The homepage already stacks several card grids; making this one scroll
 * sideways breaks that rhythm and lets the machines run larger. It is a
 * native scroll container — drag, trackpad, touch and keyboard all work
 * without a carousel library, and there is no autoplay to fight.
 */
export default function FeaturedRail({ products, total }: { products: Product[]; total: number }) {
  const rail = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-rail-item]');
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="section-tight relative overflow-hidden bg-paper-sunken py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <span className="eyebrow">Most specified</span>
            <RevealText as="h2" className="mt-6 text-headline-xl" lines={['Featured equipment']} />
          </div>

          <div className="flex items-center gap-6">
            <Link href="/shop" className="group cta-text">
              <span className="relative">
                All {total} machines
                <span className="cta-text__line absolute -bottom-1 left-0" />
              </span>
              <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
            </Link>

            {/* Rail controls — desktop only; touch users just swipe. */}
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Scroll featured equipment left"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/12 text-ink-900 transition-colors duration-micro hover:border-ink-900 hover:bg-ink-900 hover:text-white"
              >
                <IconArrow className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Scroll featured equipment right"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/12 text-ink-900 transition-colors duration-micro hover:border-ink-900 hover:bg-ink-900 hover:text-white"
              >
                <IconArrow className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={rail}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-margin-mobile pb-2 md:px-margin-desktop"
      >
        {products.map((p, i) => (
          <div
            key={p.slug}
            data-rail-item
            className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[23vw]"
          >
            <ProductCard product={p} eager={i < 2} />
          </div>
        ))}
        {/* Trailing spacer so the last card can reach the left edge */}
        <div aria-hidden className="w-px shrink-0 md:w-margin-desktop" />
      </div>
    </section>
  );
}
