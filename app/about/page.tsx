import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { RevealText, StaggerGroup, StaggerItem } from '@/components/motion/primitives';
import { ALL_CATEGORIES, BRAND, COLLECTIONS, PRODUCTS, whatsAppLink } from '@/lib/catalogue';
import { IconArrow, IconWhatsApp } from '@/components/icons';

export const metadata: Metadata = {
  title: 'About AFZOX',
  description:
    'AFZOX manufactures commercial gym equipment in India — structural steel machines, delivered and installed by our own technicians nationwide.',
  alternates: { canonical: '/about' },
};

const PRINCIPLES = [
  {
    n: '01',
    title: 'Built to be trusted',
    body: 'Machines are engineered around structural steel, sealed bearings and a phosphate-then-powder finish — specified for continuous commercial duty, not occasional home use.',
  },
  {
    n: '02',
    title: 'Manufactured, not imported',
    body: 'We run our own fabrication and powder-coat line, which means tolerances, lead times and finish are controlled at source rather than inherited from someone else’s container.',
  },
  {
    n: '03',
    title: 'Accountable after the sale',
    body: 'Cables, bearings, pop-pins and upholstery are stocked against the models in the catalogue, so a worn part does not take a station out of service for a season.',
  },
  {
    n: '04',
    title: 'One team, start to finish',
    body: 'The organisation that plans the layout also builds the equipment and installs it — no handoff between a sales agent, an importer and a third-party fitter.',
  },
];

export default function AboutPage() {
  /* Counted from the catalogue at build time. No figure appears on this page
     that the data cannot substantiate. */
  const facts = [
    { v: String(PRODUCTS.length), k: 'Machines in catalogue' },
    { v: String(COLLECTIONS.length), k: 'Equipment series' },
    { v: String(ALL_CATEGORIES.length), k: 'Ranges' },
    { v: 'PAN India', k: 'Delivery & install' },
  ];

  return (
    <>
      {/* ---------------- Statement ---------------- */}
      <section className="shell pb-16 pt-16 md:pb-20 md:pt-24">
        <span className="eyebrow">About AFZOX</span>
        <h1 className="mt-7 max-w-4xl text-display-lg text-balance">
          We build the equipment, then we stand on the floor it lands on.
        </h1>
        <p className="mt-8 max-w-prose text-body-lg text-on-surface-variant">
          AFZOX Global Strength designs and manufactures commercial gym equipment out of{' '}
          {BRAND.city}, {BRAND.region} — supplying and installing complete fitness floors for
          gyms, hotels and residential projects across {BRAND.country}.
        </p>
      </section>

      {/* ---------------- Editorial: image + argument ---------------- */}
      <section className="shell grid grid-cols-1 items-start gap-x-16 gap-y-12 pb-24 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/[0.08] bg-paper-sunken lg:sticky lg:top-[calc(var(--header-h)+40px)]">
          <Image
            src={PRODUCTS[10].image}
            alt="AFZOX manufactured commercial gym equipment"
            fill
            priority
            sizes="(max-width:1024px) 90vw, 45vw"
            className="object-contain p-10"
          />
        </div>

        <div>
          <h2 className="text-headline-lg">Why we exist</h2>
          <div className="mt-6 space-y-5 text-body-md text-on-surface-variant">
            <p>
              Most equipment suppliers in this market are importers with a warehouse — a name on
              an invoice between you and a factory you’ll never speak to. AFZOX exists because gym
              owners kept asking for something simpler: one company that plans the layout, builds
              the equipment, and stands behind it after the doors open.
            </p>
            <p>
              Every frame that leaves our facility is fully welded structural steel rather than
              bolt-together tube. Every finish goes through a phosphate treatment before
              electrostatic powder coat, because a humid Indian gym floor is a harder test than a
              showroom. And every delivery is followed by our own installation team, not a courier
              leaving crates at the door.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-black/[0.08] bg-black/[0.08]">
            {facts.map((f) => (
              <div key={f.k} className="bg-white px-5 py-6">
                <dt className="font-display text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">
                  {f.v}
                </dt>
                <dd className="mt-1.5 text-label-sm uppercase text-on-surface-variant">{f.k}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- Principles ---------------- */}
      <section className="section border-t border-black/[0.07] bg-paper-sunken">
        <div className="shell grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+56px)] lg:h-fit">
            <span className="eyebrow">Principles</span>
            <RevealText as="h2" className="mt-6 text-headline-xl" lines={['What we stand for']} />
          </div>

          <StaggerGroup className="flex flex-col">
            {PRINCIPLES.map((p) => (
              <StaggerItem key={p.n}>
                <article className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-black/[0.08] py-8 first:border-t-0 first:pt-0 md:gap-x-10 md:py-10">
                  <span className="font-display text-label-sm uppercase text-brand">{p.n}</span>
                  <div>
                    <h3 className="text-headline-sm">{p.title}</h3>
                    <p className="mt-3 max-w-prose text-body-md text-on-surface-variant">{p.body}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="surface-ink grain on-ink relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid-dark absolute inset-0" />
        </div>
        <div className="shell section-tight">
          <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="eyebrow-on-ink">Next step</span>
              <h2 className="mt-6 max-w-xl text-headline-xl text-white text-balance">
                Planning a gym floor?
              </h2>
              <p className="mt-4 max-w-md text-body-md text-white/55">
                Send your dimensions and we’ll return a scaled equipment layout — no obligation.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={whatsAppLink()} target="_blank" rel="noopener" className="btn btn-whatsapp">
                <IconWhatsApp className="h-4 w-4" /> WhatsApp
              </a>
              <Link href="/shop" className="btn btn-on-ink group">
                Browse the catalogue
                <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
