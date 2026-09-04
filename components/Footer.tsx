import Link from 'next/link';
import Image from 'next/image';
import { BRAND, COLLECTIONS, collectionCategories } from '@/lib/catalogue';
import { IconArrow } from './icons';

const NAVIGATION = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/categories', label: 'Collections' },
  { href: '/services', label: 'Commercial setup' },
  { href: '/about', label: 'About' },
];

const SUPPORT = [
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/enquiry', label: 'Enquiry list' },
];

/**
 * Closing brand moment. Ink, so the page resolves into the brand rather than
 * fading out on white — and the oversized wordmark at the base gives the
 * footer a floor instead of a trailing edge.
 *
 * Every contact detail is read from the brand record; none is written here.
 */
export default function Footer() {
  return (
    <footer className="surface-ink grain on-ink relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-dark absolute inset-0 opacity-60" />
      </div>

      <div className="shell pt-20 md:pt-28">
        {/* ---------------- Top: identity + directory ---------------- */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 pb-16 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5" aria-label="AFZOX — home">
              <Image
                src="/afzox-icon.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-display text-[15px] font-bold leading-none tracking-tight text-white">
                AFZOX
                <span className="ml-1.5 font-medium text-white/45">Global Strength</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-body-sm text-white/50">
              Commercial strength equipment — specified, delivered and installed.
            </p>
          </div>

          <div>
            <h2 className="text-label-sm uppercase text-white/40">Navigation</h2>
            <ul className="mt-5 space-y-3">
              {NAVIGATION.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-body-sm text-white/70 transition-colors duration-micro hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-label-sm uppercase text-white/40">Support</h2>
            <ul className="mt-5 space-y-3">
              {SUPPORT.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-body-sm text-white/70 transition-colors duration-micro hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-label-sm uppercase text-white/40">Contact</h2>
            <ul className="mt-5 space-y-3 text-body-sm">
              <li>
                <a
                  href={`tel:+${BRAND.phoneRaw}`}
                  className="text-white/70 transition-colors duration-micro hover:text-white"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="break-all text-white/70 transition-colors duration-micro hover:text-white"
                >
                  {BRAND.email}
                </a>
              </li>
              <li className="text-white/45">
                {BRAND.city}, {BRAND.region}
                <br />
                {BRAND.country}
              </li>
            </ul>
          </div>
        </div>

        {/* ---------------- Series directory ----------------
            One column per collection — never a shared list — so the row
            scales as series are added and nothing reads as nested. */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 py-14 md:grid-cols-4">
          {COLLECTIONS.map((col) => (
            <div key={col.slug}>
              <Link href={col.url} className="group inline-flex items-center gap-2">
                <span className="text-label-md uppercase text-primary-fixed-dim">
                  {col.displayName}
                </span>
                <IconArrow className="h-3.5 w-3.5 text-primary-fixed-dim/60 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
              </Link>
              <p className="mt-1 text-label-sm uppercase text-white/35">{col.count} products</p>

              <ul className="mt-4 space-y-2.5">
                {collectionCategories(col.slug)
                  .slice(0, 5)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={c.url}
                        className="text-body-sm text-white/55 transition-colors duration-micro hover:text-white"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- Oversized wordmark ---------------- */}
      <div aria-hidden className="shell select-none pt-4">
        <span className="block whitespace-nowrap font-display text-[clamp(4rem,17vw,15rem)] font-bold leading-[0.8] tracking-[-0.045em] text-white/[0.055]">
          AFZOX
        </span>
      </div>

      <div className="shell">
        <div className="flex flex-col-reverse items-start justify-between gap-3 border-t border-white/10 py-7 text-label-sm uppercase text-white/35 md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {BRAND.legal}
          </span>
          <span>{BRAND.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
