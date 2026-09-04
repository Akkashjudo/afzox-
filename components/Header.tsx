'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { COLLECTIONS, collectionCategories } from '@/lib/catalogue';
import { NAV_LINKS } from '@/lib/site';
import { useEnquiry } from '@/lib/enquiry-context';
import { DUR, EASE, STAGGER } from './motion/primitives';
import { IconArrow, IconBag, IconChevDown, IconClose, IconMenu, IconSearch } from './icons';

/**
 * Site header.
 *
 * Two states, and which one applies is decided by the page, not by a route
 * whitelist: any page that renders a dark hero also renders
 * `<div id="hero-sentinel">` at its top. While that sentinel is under the
 * header band the bar is transparent with light type, so the nav reads as
 * part of the hero. Once it scrolls away — or on a page with no dark hero at
 * all — the bar becomes a solid light rail with a hairline rule.
 */
export default function Header() {
  const pathname = usePathname();
  const { count } = useEnquiry();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  /* ---- Scroll state ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- Is a dark hero currently behind the bar? ---- */
  useEffect(() => {
    const sentinel = document.getElementById('hero-sentinel');
    if (!sentinel) {
      setOverHero(false);
      return;
    }
    if (typeof IntersectionObserver === 'undefined') {
      setOverHero(false);
      return;
    }
    const io = new IntersectionObserver(([e]) => setOverHero(e.isIntersecting), {
      // Only the strip of hero directly beneath the bar counts.
      rootMargin: '-76px 0px 0px 0px',
      threshold: 0,
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, [pathname]);

  /* ---- Mega menu: click-outside + Escape (hover alone never fires on touch) ---- */
  useEffect(() => {
    if (!megaOpen) return;
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMegaOpen(false);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [megaOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  /* Light type only while genuinely over the hero and not scrolled past it. */
  const onDark = overHero && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,box-shadow] duration-control ease-afzox ${
        onDark
          ? 'border-b border-white/10 bg-transparent'
          : scrolled || mobileOpen
            ? 'border-b border-black/[0.07] bg-white/85 shadow-glass backdrop-blur-glass'
            : 'border-b border-black/[0.07] bg-paper'
      }`}
      data-on-dark={onDark || undefined}
    >
      <div className="shell flex h-[var(--header-h)] flex-nowrap items-center gap-2 sm:gap-4">
        {/* ---------------- Logo ---------------- */}
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="AFZOX — home"
        >
          <Image
            src="/afzox-icon.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 object-contain"
            priority
          />
          <span
            className={`hidden whitespace-nowrap font-display text-[15px] font-bold leading-none tracking-tight sm:block ${
              onDark ? 'text-white' : 'text-ink-900'
            }`}
          >
            AFZOX
            <span className={`ml-1.5 font-medium ${onDark ? 'text-white/45' : 'text-on-surface-variant'}`}>
              Global Strength
            </span>
          </span>
          <span
            className={`whitespace-nowrap font-display text-sm font-bold leading-none tracking-tight sm:hidden ${
              onDark ? 'text-white' : 'text-ink-900'
            }`}
          >
            AFZOX
          </span>
        </Link>

        {/* ---------------- Primary nav ---------------- */}
        <nav className="ml-4 hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            const base = `relative rounded-md px-3.5 py-2 text-label-md uppercase transition-colors duration-micro ${
              onDark
                ? active
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
                : active
                  ? 'text-ink-900'
                  : 'text-on-surface-variant hover:text-ink-900'
            }`;

            if (l.href === '/categories') {
              return (
                <div
                  key={l.href}
                  ref={megaRef}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    className={`${base} flex items-center gap-1.5`}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onClick={() => setMegaOpen((v) => !v)}
                  >
                    {l.label}
                    <IconChevDown
                      className={`h-3 w-3 transition-transform duration-control ease-afzox ${megaOpen ? 'rotate-180' : ''}`}
                    />
                    {active && <ActiveRule onDark={onDark} />}
                  </button>

                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: DUR.control, ease: EASE }}
                        className="absolute left-1/2 top-full w-[1180px] max-w-[calc(100vw-3rem)] -translate-x-1/2 pt-4"
                      >
                        {/* Collections sit beside one another and are never
                            nested — every series is a sibling. */}
                        <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-card-hover">
                          <div className="grid grid-cols-4 divide-x divide-black/[0.06]">
                            {COLLECTIONS.map((col) => (
                              <div key={col.slug} className="p-5">
                                <Link
                                  href={col.url}
                                  className="group flex items-baseline justify-between gap-2 pb-3"
                                >
                                  <span className="text-label-md uppercase text-brand">
                                    {col.displayName}
                                  </span>
                                  <span className="text-label-sm uppercase text-on-surface-variant/70">
                                    {col.count}
                                  </span>
                                </Link>
                                <div className="flex flex-col border-t border-black/[0.06] pt-2">
                                  {collectionCategories(col.slug).map((c) => (
                                    <Link
                                      key={c.slug}
                                      href={c.url}
                                      className="group flex items-center gap-3 rounded-lg p-2 transition-colors duration-micro hover:bg-paper-sunken"
                                    >
                                      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded bg-paper-sunken">
                                        <Image
                                          src={c.image}
                                          alt=""
                                          fill
                                          sizes="36px"
                                          className="object-contain p-1"
                                        />
                                      </span>
                                      <span className="min-w-0 flex-1">
                                        <span className="block truncate text-[13px] font-medium text-ink-900">
                                          {c.name}
                                        </span>
                                        <span className="block text-label-sm uppercase text-on-surface-variant/70">
                                          {c.count} machines
                                        </span>
                                      </span>
                                      <IconArrow className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-on-surface-variant opacity-0 transition-all duration-control ease-afzox group-hover:translate-x-0 group-hover:opacity-100" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          <Link
                            href="/shop"
                            className="group flex items-center justify-between border-t border-black/[0.06] bg-paper-sunken px-5 py-3.5 transition-colors duration-micro hover:bg-paper-deep"
                          >
                            <span className="text-label-md uppercase text-ink-900">
                              Browse the full catalogue
                            </span>
                            <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={l.href}
                href={l.href}
                className={base}
                aria-current={active ? 'page' : undefined}
              >
                {l.label}
                {active && <ActiveRule onDark={onDark} />}
              </Link>
            );
          })}
        </nav>

        {/* ---------------- Actions ---------------- */}
        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/shop"
            className={`hidden h-10 w-10 items-center justify-center rounded-md transition-colors duration-micro sm:flex ${
              onDark ? 'text-white/60 hover:text-white' : 'text-on-surface-variant hover:text-ink-900'
            }`}
            aria-label="Search equipment"
          >
            <IconSearch className="h-[18px] w-[18px]" />
          </Link>

          <Link
            href="/enquiry"
            className={`relative flex h-10 w-10 items-center justify-center rounded-md transition-colors duration-micro ${
              onDark ? 'text-white/60 hover:text-white' : 'text-on-surface-variant hover:text-ink-900'
            }`}
            aria-label={`Enquiry list, ${count} item${count === 1 ? '' : 's'}`}
          >
            <IconBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute right-1 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>

          <Link
            href="/contact"
            className={`btn btn-sm ml-2 hidden sm:inline-flex ${onDark ? 'bg-white text-ink-900 hover:bg-primary-fixed-dim' : 'btn-primary'}`}
          >
            Enquiry
          </Link>

          <button
            className={`ml-1 flex h-10 w-10 items-center justify-center rounded-md lg:hidden ${
              onDark ? 'text-white' : 'text-ink-900'
            }`}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ---------------- Mobile panel ---------------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.control, ease: EASE }}
            data-lenis-prevent
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[99] overflow-y-auto overscroll-contain bg-paper lg:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              className="shell flex flex-col py-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: STAGGER.tight, delayChildren: 0.04 } } }}
            >
              {NAV_LINKS.map((l) => (
                <motion.div
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: DUR.section, ease: EASE } },
                  }}
                >
                  <Link
                    href={l.href}
                    className="flex items-center justify-between border-b border-black/[0.07] py-4 font-display text-xl font-semibold text-ink-900"
                  >
                    {l.label}
                    <IconArrow className="h-4 w-4 text-on-surface-variant" />
                  </Link>

                  {l.href === '/categories' && (
                    <div className="flex flex-col gap-2 py-4">
                      {COLLECTIONS.map((col) => (
                        <Link
                          key={col.slug}
                          href={col.url}
                          className="flex items-center justify-between rounded-lg border border-black/[0.07] bg-white px-4 py-3.5"
                        >
                          <span className="text-label-md uppercase text-brand">{col.displayName}</span>
                          <span className="text-label-sm uppercase text-on-surface-variant">
                            {col.count} products
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: DUR.section, ease: EASE } },
                }}
                className="mt-6 flex flex-col gap-3"
              >
                <Link href="/enquiry" className="btn btn-secondary btn-block justify-between">
                  <span>Enquiry list</span>
                  <span>{count > 0 ? count : ''}</span>
                </Link>
                <Link href="/contact" className="btn btn-primary btn-block">
                  Send an enquiry
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Hairline under the active nav item. */
function ActiveRule({ onDark }: { onDark: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute inset-x-3.5 -bottom-0.5 h-px ${onDark ? 'bg-white' : 'bg-ink-900'}`}
    />
  );
}
