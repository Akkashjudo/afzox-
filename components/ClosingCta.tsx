import Link from 'next/link';
import { BRAND, whatsAppLink } from '@/lib/catalogue';
import { RevealText } from './motion/primitives';
import { IconArrow, IconWhatsApp } from './icons';

/**
 * The closing moment. Full-bleed ink rather than a rounded card floating on
 * paper — the page resolves into the brand instead of ending on another tile.
 */
export default function ClosingCta() {
  return (
    <section className="surface-ink grain on-ink relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="ambient-glow absolute left-1/2 top-full h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[150px]" />
      </div>

      <div className="shell section-tall">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span className="eyebrow-on-ink">Start a project</span>
            <RevealText
              as="h2"
              className="mt-7 text-display-lg text-white [text-wrap:balance]"
              lines={['Tell us the floor.', 'We’ll do the rest.']}
            />
            <p className="mt-7 max-w-lg text-body-lg text-white/55">
              Send your dimensions and target opening date and we’ll come back with an
              indicative equipment schedule and a scaled layout.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <a
              href={whatsAppLink()}
              target="_blank"
              rel="noopener"
              className="btn btn-lg btn-whatsapp group justify-between"
            >
              <span className="flex items-center gap-2.5">
                <IconWhatsApp className="h-4 w-4" /> WhatsApp us
              </span>
              <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
            </a>
            <Link href="/contact" className="btn btn-lg btn-on-ink group justify-between">
              <span>Send an enquiry</span>
              <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
            </Link>
            <Link href="/shop" className="btn btn-lg btn-on-ink group justify-between">
              <span>Browse the catalogue</span>
              <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Contact rail — real details only, straight from the brand record. */}
        <dl className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {[
            { k: 'Call', v: BRAND.phone, href: `tel:+${BRAND.phoneRaw}` },
            { k: 'Email', v: BRAND.email, href: `mailto:${BRAND.email}` },
            { k: 'Based in', v: `${BRAND.city}, ${BRAND.region}` },
          ].map((row) => (
            <div key={row.k} className="bg-ink-900 px-6 py-6">
              <dt className="text-label-sm uppercase text-white/40">{row.k}</dt>
              <dd className="mt-2 font-display text-base font-semibold text-white">
                {row.href ? (
                  <a href={row.href} className="transition-colors duration-micro hover:text-primary-fixed-dim">
                    {row.v}
                  </a>
                ) : (
                  row.v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
