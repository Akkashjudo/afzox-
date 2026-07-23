'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { CATEGORIES, PRODUCTS, filterProducts } from '@/lib/catalogue';
import { BAND_LABEL } from '@/lib/catalogue';
import type { PriceBand } from '@/lib/types';
import { IconChevRight, IconClose, IconEmpty, IconSearch } from './icons';

type Usage = 'all' | 'home' | 'commercial';
type Band = 'all' | PriceBand;

export default function ShopExplorer({ initialCategory = 'all' }: { initialCategory?: string }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [usage, setUsage] = useState<Usage>('all');
  const [band, setBand] = useState<Band>('all');
  const [sort, setSort] = useState<'featured' | 'popular' | 'newest' | 'az' | 'za'>('featured');

  const activeCategory = CATEGORIES.find((c) => c.slug === category);
  const list = useMemo(
    () => filterProducts({ query, category, usage, band, sort }),
    [query, category, usage, band, sort]
  );

  const reset = () => {
    setQuery('');
    setCategory('all');
    setUsage('all');
    setBand('all');
    setSort('featured');
  };

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary">Home</Link>
        <IconChevRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-primary">Shop</Link>
        {activeCategory && (
          <>
            <IconChevRight className="h-3 w-3" />
            <span aria-current="page">{activeCategory.name}</span>
          </>
        )}
      </nav>

      <h1 className="mt-3 text-headline-xl">
        {activeCategory ? (
          <>
            {activeCategory.name.replace(' Machines', '')} <span className="text-primary">Collection</span>
          </>
        ) : (
          <>Equipment <span className="text-primary">Catalogue</span></>
        )}
      </h1>
      <p className="mt-3 max-w-2xl text-body-md text-on-surface-variant">
        {activeCategory ? activeCategory.desc : `Discover our full range of ${PRODUCTS.length} commercial and high-end residential machines, manufactured and installed across India.`}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* ---------- FILTER SIDEBAR ---------- */}
        <aside className="lg:sticky lg:top-[104px] lg:h-fit">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Filters</h2>
              <button onClick={reset} className="text-xs font-semibold text-primary hover:underline">
                Clear All
              </button>
            </div>

            <div className="relative mt-5">
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search equipment…"
                className="w-full rounded-xl border border-outline-variant bg-surface py-2.5 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
              />
            </div>

            <FilterGroup label="Range">
              <Checkline active={category === 'all'} onClick={() => setCategory('all')}>
                All ranges <b>{PRODUCTS.length}</b>
              </Checkline>
              {CATEGORIES.map((c) => (
                <Checkline key={c.slug} active={category === c.slug} onClick={() => setCategory(c.slug)}>
                  {c.name} <b>{c.count}</b>
                </Checkline>
              ))}
            </FilterGroup>

            <FilterGroup label="Suitable For">
              {(['all', 'commercial', 'home'] as Usage[]).map((u) => (
                <Checkline key={u} active={usage === u} onClick={() => setUsage(u)}>
                  {u === 'all' ? 'All' : u === 'commercial' ? 'Commercial' : 'Home Gym'}
                </Checkline>
              ))}
            </FilterGroup>

            <FilterGroup label="Specification Tier">
              {(['all', 'premium', 'standard', 'value'] as Band[]).map((b) => (
                <Checkline key={b} active={band === b} onClick={() => setBand(b)}>
                  {b === 'all' ? 'All tiers' : BAND_LABEL[b as PriceBand]}
                </Checkline>
              ))}
            </FilterGroup>
          </div>
        </aside>

        {/* ---------- RESULTS ---------- */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-4">
            <p className="text-sm text-on-surface-variant">
              Showing <b className="text-on-background">{list.length}</b> of {PRODUCTS.length} machines
              {query && <> matching &ldquo;{query}&rdquo;</>}
            </p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-on-surface-variant">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="rounded-lg border border-outline-variant bg-white px-2.5 py-1.5 text-sm font-medium focus:border-primary focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="az">Name A–Z</option>
                <option value="za">Name Z–A</option>
              </select>
            </label>
          </div>

          {/* initial={false}: the very first paint must show cards at full
              opacity immediately (this grid is the LCP candidate on /shop) —
              Framer Motion only animates items that enter/exit *after* mount,
              e.g. when a filter changes the list. */}
          <AnimatePresence mode="popLayout" initial={false}>
            {list.length ? (
              <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i, 6) * 0.02 }}
                  >
                    <ProductCard product={p} eager={i < 3} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                <IconEmpty className="mx-auto h-12 w-12 text-outline-variant" />
                <h3 className="mt-4 font-bold">No machines match that</h3>
                <p className="mt-1 text-sm text-on-surface-variant">Try a broader term, or reset the filters.</p>
                <button onClick={reset} className="btn btn-secondary btn-sm mt-5">
                  <IconClose className="h-3.5 w-3.5" /> Reset filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-black/5 pt-5 first:mt-5 first:border-0 first:pt-0">
      <h3 className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">{label}</h3>
      <div className="mt-3 space-y-1">{children}</div>
    </div>
  );
}

function Checkline({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors [&_b]:ml-auto [&_b]:shrink-0 [&_b]:font-mono [&_b]:text-xs [&_b]:font-normal [&_b]:text-on-surface-variant/60 ${
        active ? 'bg-primary/10 font-semibold text-primary' : 'text-on-surface-variant hover:bg-surface hover:text-on-background'
      }`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
          active ? 'border-primary bg-primary' : 'border-outline-variant'
        }`}
      >
        {active && (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </span>
      {children}
    </button>
  );
}
