'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/catalogue';
import { NAV_LINKS } from '@/lib/site';
import { useEnquiry } from '@/lib/enquiry-context';
import { IconBag, IconChevDown, IconClose, IconMenu, IconSearch } from './icons';

export default function Header() {
  const pathname = usePathname();
  const { count } = useEnquiry();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Click-outside and Escape close the mega menu — required for touch and keyboard users,
  // since hover alone never fires on a touchscreen.
  useEffect(() => {
    if (!megaOpen) return;
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
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
  }, [mobileOpen]);

  // Escape closes the mobile drawer too.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={`mx-auto flex h-[60px] max-w-shell flex-nowrap items-center gap-1.5 rounded-full px-2.5 pr-1.5 transition-shadow duration-300 sm:h-[68px] sm:gap-3 sm:px-3 sm:pr-2 md:px-5 ${
          scrolled ? 'glass-nav' : 'bg-white/60 backdrop-blur-glass border border-transparent'
        }`}
      >
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2 pl-0.5 sm:pl-1" aria-label="AFZOX home">
          <Image
            src="/afzox-icon.png"
            alt="AFZOX"
            width={44}
            height={44}
            className="h-8 w-8 shrink-0 object-contain sm:h-11 sm:w-11"
            priority
          />
          {/* Condensed single-line mark — always visible, even at 320px */}
          <span className="whitespace-nowrap text-sm font-extrabold leading-none tracking-tight sm:hidden">
            AFZO<span className="text-primary">X</span>
          </span>
          {/* Full lockup — room for it only from the sm breakpoint up */}
          <span className="hidden whitespace-nowrap font-bold leading-tight tracking-tight sm:block">
            AFZOX <span className="text-primary">Global</span>
            <br />
            Strength
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
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
                    className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-label-md uppercase tracking-wide transition-colors ${
                      active ? 'text-primary' : 'text-on-surface-variant hover:text-on-background'
                    }`}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onClick={() => setMegaOpen((v) => !v)}
                  >
                    {l.label}
                    <IconChevDown className="h-3.5 w-3.5" />
                  </button>
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3"
                      >
                        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-black/5 bg-white p-3 shadow-card-hover">
                          {CATEGORIES.map((c) => (
                            <Link
                              key={c.slug}
                              href={c.url}
                              className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface"
                            >
                              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface">
                                <Image src={c.image} alt="" fill sizes="48px" className="object-contain p-1" />
                              </span>
                              <span>
                                <span className="block text-sm font-semibold">{c.name}</span>
                                <span className="block text-xs text-on-surface-variant">{c.count} machines</span>
                              </span>
                            </Link>
                          ))}
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
                className={`rounded-full px-3.5 py-2 text-label-md uppercase tracking-wide transition-colors ${
                  active ? 'text-primary' : 'text-on-surface-variant hover:text-on-background'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/shop"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface hover:text-on-background sm:flex"
            aria-label="Search equipment"
          >
            <IconSearch className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="/enquiry"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface hover:text-on-background"
            aria-label={`Enquiry list, ${count} item${count === 1 ? '' : 's'}`}
          >
            <IconBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-on-primary">
                {count}
              </span>
            )}
          </Link>
          <Link href="/contact" className="btn btn-primary btn-sm ml-1 hidden sm:inline-flex">
            Enquiry
          </Link>
          <button
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-on-background lg:hidden"
            aria-expanded={mobileOpen}
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 max-w-shell rounded-3xl border border-black/5 bg-white p-5 shadow-card-hover lg:hidden"
          >
            <nav className="flex flex-col divide-y divide-black/5" aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="py-3.5 text-lg font-semibold">
                  {l.label}
                </Link>
              ))}
              <Link href="/enquiry" className="py-3.5 text-lg font-semibold">
                Enquiry List {count > 0 && `(${count})`}
              </Link>
            </nav>
            <Link href="/contact" className="btn btn-primary btn-block mt-4 w-full">
              Enquiry
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
