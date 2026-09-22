import Link from 'next/link';
import Image from 'next/image';
import { BRAND, COLLECTIONS } from '@/lib/catalogue';
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
 * Closing footer — light, so the page resolves out of the dark CTA above it
 * rather than continuing into more ink. The previous ink footer left the
 * bottom third of every page dark and made the CTA stop reading as a moment.
 *
 * The series directory is a single row of collections rather than a column
 * per collection with its ranges underneath. That version mirrored the mega
 * menu — around thirty links — which is navigation the footer does not need
 * to repeat; the mega menu and /categories both do it better.
 *
 * Every contact detail is read from the brand record; none is written here.
 *
 * Flat paper, no texture. The ink footer carried a faint grid because 5% white
 * on near-black reads as tooth; the same grid on paper resolves into crisp 1px
 * rules on a 72px pitch that land mid-column and read as accidental table
 * borders through the link lists. Every other light section on the site is
 * flat, so this matches them. `overflow-hidden` stays for the wordmark below.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/[0.08] bg-paper">
      <div className="shell pt-16 md:pt-20">
        {/* ---------------- Identity + directory ---------------- */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 pb-14 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="AFZOX — home">
              <Image
                src="/afzox-mark.png"
                alt=""
                width={480}
                height={315}
                className="h-9 w-auto lg:h-10"
              />
              <span className="font-display text-base font-bold leading-none tracking-tight text-ink-900">
                AFZOX
                <span className="ml-1.5 font-medium text-on-surface-variant">Global Strength</span>
              </span>
            </Link>

            <p className="mt-5 max-w-[26ch] text-body-sm text-on-surface-variant">
              Commercial strength, cardio and functional equipment — specified, delivered
              and installed across India.
            </p>

            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-label-md uppercase text-ink-900"
            >
              Start a project
              <IconArrow className="h-3.5 w-3.5 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
            </Link>
          </div>

          <FooterColumn title="Navigation" links={NAVIGATION} />
          <FooterColumn title="Support" links={SUPPORT} />

          <div>
            <h2 className="text-label-md uppercase text-on-surface-variant">Contact</h2>
            <ul className="mt-5 space-y-3 text-body-sm">
              <li>
                <a
                  href={`tel:${BRAND.phoneRaw}`}
                  className="font-medium text-ink-900 transition-colors duration-micro hover:text-brand"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="break-all font-medium text-ink-900 transition-colors duration-micro hover:text-brand"
                >
                  {BRAND.email}
                </a>
              </li>
              <li className="text-on-surface-variant">
                {BRAND.city}, {BRAND.region}
                <br />
                {BRAND.country}
              </li>
            </ul>
          </div>
        </div>

        {/* ---------------- Collections ----------------
            One row, collections only. The ranges inside each one live in the
            mega menu and on /categories; repeating them here was thirty links
            of duplicate navigation at the quietest point on the page. */}
        <div className="border-t border-black/[0.08] py-10">
          <h2 className="text-label-md uppercase text-on-surface-variant">Collections</h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {COLLECTIONS.map((col) => (
              <Link
                key={col.slug}
                href={col.url}
                className="group inline-flex items-center gap-2 rounded-full border border-black/[0.10] bg-white px-4 py-2 text-label-sm uppercase text-ink-900 transition-colors duration-control ease-afzox hover:border-ink-900"
              >
                {col.displayName}
                <IconArrow className="h-3 w-3 -translate-x-0.5 text-on-surface-variant transition-transform duration-control ease-afzox group-hover:translate-x-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Oversized wordmark ----------------
          Gives the page a floor rather than a trailing edge. Very low contrast
          on light needs a lighter hand than it did on ink. */}
      <div aria-hidden className="shell select-none pt-2">
        <span className="block whitespace-nowrap font-display text-[clamp(4rem,17vw,15rem)] font-bold leading-[0.8] tracking-[-0.045em] text-ink-900/[0.055]">
          AFZOX
        </span>
      </div>

      <div className="shell">
        <div className="flex flex-col-reverse items-start justify-between gap-3 border-t border-black/[0.08] py-7 text-label-sm uppercase text-on-surface-variant md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {BRAND.legal}
          </span>
          <span>{BRAND.tagline}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-label-md uppercase text-on-surface-variant">{title}</h2>
      <ul className="mt-5 space-y-3 text-body-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-ink-900/80 transition-colors duration-micro hover:text-brand"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
