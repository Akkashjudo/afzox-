'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from './ProductCard';
import {
  ALL_CATEGORIES,
  COLLECTIONS,
  PRODUCTS,
  availableBodyAreas,
  availableEquipmentTypes,
  filterProducts,
  getCategory,
  getCollection,
} from '@/lib/catalogue';
import type { BodyArea } from '@/lib/types';
import { applyScrollLock } from '@/lib/scroll-lock';
import { IconChevRight, IconClose, IconEmpty, IconFilter, IconSearch } from './icons';

type Usage = 'all' | 'home' | 'commercial';
type Sort = 'featured' | 'popular' | 'newest' | 'az' | 'za';

const SORT_LABELS: Record<Sort, string> = {
  featured: 'Featured',
  popular: 'Most Popular',
  newest: 'Newest',
  az: 'Name A–Z',
  za: 'Name Z–A',
};

const toggle = <T,>(list: T[], value: T): T[] =>
  list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

export default function ShopExplorer({
  initialCollection = 'all',
  initialCategory = 'all',
  /** Locks the collection to the page's own collection — used by the two
   *  collection pages, so /shop/hs-series can never surface an AFZOX Series
   *  product and /shop/afzox-series can never surface an HS Series one. */
  lockCollection = false,
}: {
  initialCollection?: string;
  initialCategory?: string;
  lockCollection?: boolean;
}) {
  /**
   * Filter state lives in React, not in `useSearchParams`. Reading search
   * params during render forces Next to bail out of static rendering, which
   * would ship these pages with an empty product grid — and this grid is both
   * the LCP element and the only thing a crawler sees. So: the first paint is
   * driven purely by the route (server-rendered, complete), and query-string
   * refinements are applied on mount and mirrored back with replaceState.
   */
  const [state, setState] = useState({
    q: '',
    collection: initialCollection,
    category: initialCategory,
    body: [] as BodyArea[],
    type: [] as string[],
    usage: 'all' as Usage,
    sort: 'featured' as Sort,
  });
  const { q: query, collection, category, body: bodyAreas, type: equipmentTypes, usage, sort } = state;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const hydrated = useRef(false);

  // Adopt any refinements already in the URL (a shared or reloaded link).
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (Array.from(sp.keys()).length) {
      setState((s) => ({
        ...s,
        q: sp.get('q') ?? s.q,
        collection: lockCollection ? s.collection : sp.get('collection') ?? s.collection,
        category: sp.get('category') ?? s.category,
        body: (sp.get('body')?.split(',').filter(Boolean) as BodyArea[]) ?? s.body,
        type: sp.get('type')?.split(',').filter(Boolean) ?? s.type,
        usage: (sp.get('usage') as Usage) ?? s.usage,
        sort: (sp.get('sort') as Sort) ?? s.sort,
      }));
    }
    hydrated.current = true;
  }, [lockCollection]);

  // Mirror state into the URL so a filtered view stays shareable, without
  // pushing a history entry per checkbox.
  useEffect(() => {
    if (!hydrated.current) return;
    const sp = new URLSearchParams();
    if (state.q) sp.set('q', state.q);
    if (!lockCollection && state.collection !== 'all') sp.set('collection', state.collection);
    if (state.category !== 'all' && state.category !== initialCategory) sp.set('category', state.category);
    if (state.body.length) sp.set('body', state.body.join(','));
    if (state.type.length) sp.set('type', state.type.join(','));
    if (state.usage !== 'all') sp.set('usage', state.usage);
    if (state.sort !== 'featured') sp.set('sort', state.sort);
    const qs = sp.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    if (url === window.location.pathname + window.location.search) return;
    // Pass the existing history state through — the App Router keeps its own
    // routing tree in there, and replacing it with null strands the router.
    window.history.replaceState(window.history.state, '', url);
  }, [state, lockCollection, initialCategory]);

  const setParams = useCallback((patch: Partial<typeof state>) => setState((s) => ({ ...s, ...patch })), []);

  const activeCollection = collection !== 'all' ? getCollection(collection) : undefined;
  const activeCategory = category !== 'all' ? getCategory(category) : undefined;

  /* ---- Scope: the whole collection, before any refinement. ---- */
  const scope = useMemo(
    () => (collection === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.collection === collection)),
    [collection]
  );

  /* ---- Options for each group are computed from the results of every *other*
     group. That keeps OR-within-a-group working (you can still add a second
     body area) while making a zero-result combination unselectable: an option
     is only offered, and only with the count it would actually return. ---- */
  const base = { query, collection, usage };
  const key = [query, collection, category, bodyAreas.join('|'), equipmentTypes.join('|'), usage].join('¦');

  const categoryOptions = useMemo(() => {
    const pool = filterProducts({ ...base, bodyAreas, equipmentTypes });
    const counts = new Map<string, number>();
    for (const p of pool) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return {
      total: pool.length,
      items: ALL_CATEGORIES.filter((c) => counts.has(c.slug)).map((c) => ({ ...c, n: counts.get(c.slug)! })),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const bodyOptions = useMemo(() => {
    const pool = filterProducts({ ...base, category, equipmentTypes });
    return availableBodyAreas(pool).map((a) => ({ a, n: pool.filter((p) => p.bodyAreas.includes(a)).length }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const typeOptions = useMemo(() => {
    const pool = filterProducts({ ...base, category, bodyAreas });
    return availableEquipmentTypes(pool).map((t) => ({ t, n: pool.filter((p) => p.equipmentType === t).length }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const showUsage = useMemo(() => scope.some((p) => p.isHome) && scope.some((p) => p.isCommercial), [scope]);

  const list = useMemo(
    () => filterProducts({ query, collection, category, bodyAreas, equipmentTypes, usage, sort }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key, sort]
  );

  /**
   * Selecting a different collection drops any refinement the new collection
   * cannot satisfy — a category belonging to the old collection, or an
   * equipment type it does not stock. Without this the grid can land on zero
   * results purely because a filter carried over, which reads as a bug rather
   * than a filter choice. Body areas are shared vocabulary across every
   * collection, so those are always kept.
   */
  const chooseCollection = (slug: string) => {
    const keepCategory = category !== 'all' && (slug === 'all' || getCategory(category)?.collection === slug);
    const inScope = slug === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.collection === slug);
    const availableTypes = new Set(inScope.map((p) => p.equipmentType));
    setParams({
      collection: slug,
      category: keepCategory ? category : 'all',
      type: equipmentTypes.filter((t) => availableTypes.has(t)),
    });
  };

  const activeChips: { label: string; clear: () => void }[] = [
    ...(activeCollection && !lockCollection
      ? [{ label: activeCollection.displayName, clear: () => chooseCollection('all') }]
      : []),
    ...(activeCategory ? [{ label: activeCategory.name, clear: () => setParams({ category: initialCategory }) }] : []),
    ...bodyAreas.map((a) => ({ label: a, clear: () => setParams({ body: toggle(bodyAreas, a) }) })),
    ...equipmentTypes.map((t) => ({ label: t, clear: () => setParams({ type: toggle(equipmentTypes, t) }) })),
    ...(usage !== 'all'
      ? [{ label: usage === 'home' ? 'Home Gym' : 'Commercial', clear: () => setParams({ usage: 'all' }) }]
      : []),
    ...(query ? [{ label: `“${query}”`, clear: () => setParams({ q: '' }) }] : []),
  ];

  // Clearing returns to the page's own route-defined scope — on
  // /shop/hs-series that is still HS Series, never the whole catalogue.
  const clearAll = () =>
    setParams({
      q: '',
      collection: lockCollection ? initialCollection : 'all',
      category: initialCategory,
      body: [],
      type: [],
      usage: 'all',
    });

  // Prevent the page behind the mobile drawer from scrolling. Refcounted and
  // Lenis-aware — see lib/scroll-lock.
  useEffect(() => applyScrollLock(drawerOpen), [drawerOpen]);

  /* Is the filter rail taller than the space a sticky column would have? If
     so it stops sticking and scrolls with the page, so every option stays
     reachable by wheel. Re-measured on resize and whenever the option lists
     change length. */
  const sidebarRef = useRef<HTMLElement>(null);
  const [sidebarTall, setSidebarTall] = useState(false);

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const available = window.innerHeight - 76 /* header */ - 64;
      setSidebarTall(el.scrollHeight > available);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [key]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  const heading = activeCategory
    ? activeCategory.name
    : activeCollection
    ? activeCollection.name
    : 'Equipment';
  const blurb = activeCategory?.desc ?? activeCollection?.desc ?? `Browse the full AFZOX range of ${PRODUCTS.length} commercial and high-end residential machines across ${COLLECTIONS.length} collections, manufactured and installed across India.`;

  const filterPanel = (
    <>
      <div className="relative">
        <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
        <input
          type="search"
          value={query}
          onChange={(e) => setParams({ q: e.target.value })}
          placeholder="Search equipment…"
          aria-label="Search equipment"
          className="w-full rounded-lg border border-outline-variant bg-white py-3 pl-9 pr-9 text-body-sm transition-colors duration-micro placeholder:text-on-surface-variant/55 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15"
        />
        {query && (
          <button
            type="button"
            onClick={() => setParams({ q: '' })}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-on-surface-variant transition-colors duration-micro hover:bg-paper-sunken hover:text-ink-900"
          >
            <IconClose className="h-3 w-3" />
          </button>
        )}
      </div>

      {!lockCollection && (
        <FilterGroup label="Collection">
          <Checkline active={collection === 'all'} onClick={() => chooseCollection('all')}>
            All collections <b>{PRODUCTS.length}</b>
          </Checkline>
          {COLLECTIONS.map((c) => (
            <Checkline key={c.slug} active={collection === c.slug} onClick={() => chooseCollection(c.slug)}>
              {c.name} <b>{c.count}</b>
            </Checkline>
          ))}
        </FilterGroup>
      )}

      {categoryOptions.items.length > 1 && (
        <FilterGroup label="Range">
          <Checkline active={category === 'all'} onClick={() => setParams({ category: 'all' })}>
            All ranges <b>{categoryOptions.total}</b>
          </Checkline>
          {categoryOptions.items.map((c) => {
            // Both collections have a "Storage & Racking" range, so the
            // all-collections view has to say which one this is.
            const owner = collection === 'all' ? getCollection(c.collection)?.name : undefined;
            return (
              <Checkline
                key={c.slug}
                active={category === c.slug}
                onClick={() => setParams({ category: c.slug })}
                label={owner ? `${c.name} — ${owner}, ${c.n} products` : `${c.name}, ${c.n} products`}
              >
                <span className="min-w-0">
                  {c.name}
                  {owner && (
                    <span className="ml-1.5 whitespace-nowrap text-[10px] uppercase tracking-wide text-on-surface-variant/60">
                      {owner}
                    </span>
                  )}
                </span>
                <b>{c.n}</b>
              </Checkline>
            );
          })}
        </FilterGroup>
      )}

      {bodyOptions.length > 1 && (
        <FilterGroup label="Body Area">
          {bodyOptions.map(({ a, n }) => (
            <Checkline key={a} active={bodyAreas.includes(a)} onClick={() => setParams({ body: toggle(bodyAreas, a) })}>
              {a} <b>{n}</b>
            </Checkline>
          ))}
        </FilterGroup>
      )}

      {typeOptions.length > 1 && (
        <FilterGroup label="Equipment Type">
          {typeOptions.map(({ t, n }) => (
            <Checkline
              key={t}
              active={equipmentTypes.includes(t)}
              onClick={() => setParams({ type: toggle(equipmentTypes, t) })}
            >
              {t} <b>{n}</b>
            </Checkline>
          ))}
        </FilterGroup>
      )}

      {showUsage && (
        <FilterGroup label="Suitable For">
          {(['all', 'commercial', 'home'] as Usage[]).map((u) => (
            <Checkline key={u} active={usage === u} onClick={() => setParams({ usage: u })}>
              {u === 'all' ? 'All' : u === 'commercial' ? 'Commercial' : 'Home Gym'}
            </Checkline>
          ))}
        </FilterGroup>
      )}

    </>
  );

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-on-surface-variant" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">Home</Link>
        <IconChevRight className="h-3 w-3 shrink-0" />
        <Link href="/shop" className="hover:text-brand">Shop</Link>
        {activeCollection && (
          <>
            <IconChevRight className="h-3 w-3 shrink-0" />
            {activeCategory ? (
              <Link href={activeCollection.url} className="hover:text-brand">{activeCollection.name}</Link>
            ) : (
              <span aria-current="page" className="text-on-background">{activeCollection.name}</span>
            )}
          </>
        )}
        {activeCategory && (
          <>
            <IconChevRight className="h-3 w-3 shrink-0" />
            <span aria-current="page" className="text-on-background">{activeCategory.name}</span>
          </>
        )}
      </nav>

      <div className="mt-8 border-b border-black/[0.08] pb-10">
        {activeCollection && (
          <span className="text-label-md uppercase text-brand">{activeCollection.displayName}</span>
        )}
        <h1 className={`text-headline-xl text-balance ${activeCollection ? 'mt-4' : 'mt-2'}`}>
          {heading}
        </h1>
        <p className="mt-4 max-w-prose text-body-md text-on-surface-variant">{blurb}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[240px_1fr]">
        {/* ---------- FILTER SIDEBAR (desktop) ----------
            The rail is never an independent scroll container, and never
            carries `data-lenis-prevent`. Both together were the scrolling
            bug: the attribute made Lenis ignore the wheel over this column,
            and because the page is Lenis-driven the event had nowhere to
            chain to — so pointing anywhere at the left column froze the page.

            Instead the rail sticks only while it fits the viewport. Once the
            filter list is taller than the screen it becomes a normal
            in-flow block and scrolls with the page, which keeps every option
            reachable with the wheel. */}
        <aside
          ref={sidebarRef}
          className={`hidden lg:block lg:pr-2 ${
            sidebarTall ? '' : 'lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:h-fit'
          }`}
        >
          <div className="flex items-baseline justify-between border-b border-black/[0.08] pb-3">
            <h2 className="text-label-md uppercase text-ink-900">Filters</h2>
            <button
              onClick={clearAll}
              className="text-label-sm uppercase text-on-surface-variant transition-colors duration-micro hover:text-brand"
            >
              Clear all
            </button>
          </div>
          <div className="mt-5">{filterPanel}</div>
        </aside>

        {/* ---------- RESULTS ---------- */}
        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.08] pb-4">
            <p className="text-label-sm uppercase text-on-surface-variant" aria-live="polite">
              <b className="font-display text-base font-bold normal-case tracking-tight text-ink-900">
                {list.length}
              </b>
              <span className="ml-2">
                of {scope.length}
                {activeCollection ? ` ${activeCollection.name}` : ''} product
                {scope.length === 1 ? '' : 's'}
              </span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDrawerOpen(true)}
                className="btn btn-secondary btn-sm lg:hidden"
                aria-haspopup="dialog"
              >
                <IconFilter className="h-4 w-4" />
                Filters{activeChips.length ? ` (${activeChips.length})` : ''}
              </button>
              <label className="flex items-center gap-2">
                <span className="hidden text-label-sm uppercase text-on-surface-variant sm:inline">
                  Sort
                </span>
                <select
                  value={sort}
                  onChange={(e) => setParams({ sort: e.target.value as Sort })}
                  aria-label="Sort products"
                  className="rounded-lg border border-outline-variant bg-white px-3 py-2 text-label-sm uppercase text-ink-900 transition-colors duration-micro focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15"
                >
                  {(Object.keys(SORT_LABELS) as Sort[]).map((s) => (
                    <option key={s} value={s}>{SORT_LABELS[s]}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {activeChips.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {activeChips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={chip.clear}
                  className="chip group hover:border-ink-900 hover:text-ink-900"
                  aria-label={`Remove filter ${chip.label}`}
                >
                  {chip.label}
                  <IconClose className="h-3 w-3 opacity-50 transition-opacity duration-micro group-hover:opacity-100" />
                </button>
              ))}
              <button
                onClick={clearAll}
                className="text-label-sm uppercase text-on-surface-variant transition-colors duration-micro hover:text-brand"
              >
                Clear all
              </button>
            </div>
          )}

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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center rounded-2xl border border-dashed border-black/[0.12] bg-paper-sunken/60 px-6 py-24 text-center"
              >
                <IconEmpty className="h-10 w-10 text-outline" />
                <h3 className="mt-5 text-headline-sm">No equipment matches those filters</h3>
                <p className="mt-2 max-w-sm text-body-sm text-on-surface-variant">
                  Try a broader search term, or clear a filter to widen the range.
                </p>
                <button onClick={clearAll} className="btn btn-secondary btn-sm mt-7">
                  <IconClose className="h-3.5 w-3.5" /> Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ---------- FILTER DRAWER (mobile) ---------- */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[190] bg-black/40 lg:hidden"
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 z-[200] flex max-h-[88svh] flex-col rounded-t-2xl bg-white lg:hidden"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-black/5 px-5 py-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface"
                  aria-label="Close filters"
                  autoFocus
                >
                  <IconClose className="h-5 w-5" />
                </button>
              </div>
              <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">{filterPanel}</div>
              <div className="shrink-0 border-t border-black/5 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <div className="flex gap-3">
                  <button onClick={clearAll} className="btn btn-secondary btn-sm flex-1">
                    Clear All
                  </button>
                  <button onClick={() => setDrawerOpen(false)} className="btn btn-primary btn-sm flex-[2]">
                    Show {list.length} product{list.length === 1 ? '' : 's'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-7 border-t border-black/[0.08] pt-5 first:mt-0 first:border-0 first:pt-0">
      <h3 className="text-label-sm uppercase text-on-surface-variant/70">{label}</h3>
      <div className="mt-3 space-y-0.5">{children}</div>
    </div>
  );
}

function Checkline({
  active,
  onClick,
  children,
  label,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  /** Explicit accessible name — used where the visible label is split across
   *  elements (e.g. a range name plus its collection qualifier). */
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`flex w-full items-center justify-between gap-2.5 rounded-md px-2.5 py-2.5 text-left text-body-sm transition-colors duration-micro lg:py-2 [&_b]:ml-auto [&_b]:shrink-0 [&_b]:text-label-sm [&_b]:font-normal [&_b]:uppercase [&_b]:text-on-surface-variant/55 ${
        active
          ? 'bg-ink-900 font-medium text-white [&_b]:text-white/50'
          : 'text-on-surface-variant hover:bg-paper-sunken hover:text-ink-900'
      }`}
    >
      <span
        className={`flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[3px] border transition-colors duration-micro ${
          active ? 'border-white bg-white' : 'border-outline'
        }`}
      >
        {active && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-2.5 w-2.5 text-ink-900"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </span>
      {children}
    </button>
  );
}
