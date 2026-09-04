import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { RevealText, StaggerGroup, StaggerItem } from '@/components/motion/primitives';
import { COLLECTIONS, PRODUCTS, whatsAppLink } from '@/lib/catalogue';
import { IconArrow, IconWhatsApp } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Commercial Gym Setup & Services',
  description:
    'Turnkey commercial gym setup, home gym consultation and annual maintenance from AFZOX — layout, manufacture, delivery and installation across India.',
  alternates: { canonical: '/services' },
};

/* Each service is its own editorial band rather than a card in a row of
   three — the page reads as a sequence of capabilities instead of a grid. */
const SERVICES = [
  {
    n: '01',
    title: 'Commercial fit-out',
    lede: 'One team from floor plan to handover.',
    body: 'Layout, equipment schedule, manufacture, delivery and installation — without a broker in the middle. You deal with the people who build the machines.',
    points: [
      'Scaled floor layout, no obligation',
      'Itemised equipment schedule',
      'Phased delivery for multi-zone floors',
      'Staff walkthrough at handover',
    ],
  },
  {
    n: '02',
    title: 'Residential consultation',
    lede: 'Equipment sized to the room, not the showroom.',
    body: 'Home and apartment gyms have real constraints — ceiling height, floor loading, noise through a slab. We specify against those first.',
    points: [
      'Fit checked against room dimensions',
      'Floor-load and noise guidance',
      'Compact multi-station options',
      'Direct WhatsApp consultation',
    ],
  },
  {
    n: '03',
    title: 'Maintenance contracts',
    lede: 'Scheduled servicing, documented every visit.',
    body: 'Cable tension, bearing play, upholstery integrity and fastener torque, checked on every station against a written list you keep a copy of.',
    points: [
      'Scheduled site visits',
      'Documented service checklist',
      'Genuine stocked spares',
      'Priority breakdown response',
    ],
  },
];

const PROCESS = [
  { step: '01', title: 'Consultation', body: 'Floor dimensions, target membership and budget band in; a recommended equipment mix out.' },
  { step: '02', title: 'Layout & quote', body: 'A scaled 2D layout with station spacing and circulation, plus an itemised quotation.' },
  { step: '03', title: 'Manufacture', body: 'Production, quality inspection and crated dispatch against a confirmed delivery window.' },
  { step: '04', title: 'Install & handover', body: 'Assembly, levelling, bolt-down, staff walkthrough and the service schedule set up before we leave.' },
];

export default function ServicesPage() {
  const showcase = PRODUCTS.find((p) => p.slug === 'commercial-half-rack') ?? PRODUCTS[0];

  return (
    <>
      {/* ---------------- Statement ---------------- */}
      <section className="shell pb-16 pt-16 md:pb-24 md:pt-24">
        <span className="eyebrow">Services</span>
        <h1 className="mt-7 max-w-4xl text-display-lg text-balance">
          We don’t just ship the equipment. We put it on your floor.
        </h1>
        <p className="mt-8 max-w-prose text-body-lg text-on-surface-variant">
          From a single station to a complete commercial floor — designed, manufactured,
          delivered and installed by one team, then kept running on a schedule.
        </p>
      </section>

      {/* ---------------- Services as editorial bands ---------------- */}
      <section className="border-t border-black/[0.07]">
        {SERVICES.map((s, i) => (
          <div
            key={s.n}
            className={`border-b border-black/[0.07] ${i % 2 === 1 ? 'bg-paper-sunken' : ''}`}
          >
            <div className="shell grid grid-cols-1 gap-x-16 gap-y-8 py-14 md:py-20 lg:grid-cols-[0.42fr_0.58fr]">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+56px)] lg:h-fit">
                <span className="font-display text-label-sm uppercase text-brand">{s.n}</span>
                <h2 className="mt-4 text-headline-lg text-balance">{s.title}</h2>
                <p className="mt-4 max-w-sm text-body-md text-on-surface-variant">{s.lede}</p>
              </div>

              <div>
                <p className="max-w-prose text-body-lg text-ink-900">{s.body}</p>
                <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-black/[0.08] bg-black/[0.08] sm:grid-cols-2">
                  {s.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-3 bg-white px-5 py-4 text-body-sm text-on-surface-variant"
                    >
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsAppLink()}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-secondary btn-sm group mt-6"
                >
                  Enquire about this
                  <IconArrow className="h-3.5 w-3.5 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ---------------- Process — numbered rail, not four cards ---------------- */}
      <section className="section">
        <div className="shell">
          <div className="max-w-2xl">
            <span className="eyebrow">How a project runs</span>
            <RevealText
              as="h2"
              className="mt-6 text-headline-xl text-balance"
              lines={['From floor plan', 'to first member.']}
            />
          </div>

          <StaggerGroup className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.08] md:grid-cols-2 xl:grid-cols-4">
            {PROCESS.map((p) => (
              <StaggerItem key={p.step} className="h-full">
                <article className="flex h-full flex-col bg-white p-7">
                  <span className="font-display text-label-sm uppercase text-brand">{p.step}</span>
                  <h3 className="mt-4 text-headline-sm">{p.title}</h3>
                  <p className="mt-3 text-body-sm text-on-surface-variant">{p.body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------------- Catalogue crossover ---------------- */}
      <section className="surface-ink grain on-ink relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid-dark absolute inset-0" />
        </div>
        <div className="shell grid grid-cols-1 items-center gap-x-16 gap-y-12 py-20 md:py-28 lg:grid-cols-2">
          <div>
            <span className="eyebrow-on-ink">One catalogue</span>
            <h2 className="mt-6 max-w-lg text-headline-xl text-white text-balance">
              Every service specifies from the same {PRODUCTS.length} machines.
            </h2>
            <p className="mt-5 max-w-md text-body-md text-white/55">
              Nothing is sourced ad hoc for a project. What you see in the catalogue is what
              gets scheduled, built and installed.
            </p>

            <ul className="mt-9 flex flex-wrap gap-2">
              {COLLECTIONS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.url}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-label-sm uppercase text-white/70 transition-colors duration-micro hover:border-white hover:text-white"
                  >
                    {c.displayName}
                    <span className="text-white/40">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <span aria-hidden className="absolute -left-3 -top-3 h-10 w-10 border-l border-t border-white/20" />
            <span aria-hidden className="absolute -bottom-3 -right-3 h-10 w-10 border-b border-r border-white/20" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-white/15">
              <Image
                src={showcase.image}
                alt={`${showcase.name} — AFZOX commercial gym equipment`}
                fill
                sizes="(max-width:1024px) 90vw, 45vw"
                className="object-contain p-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="section-tight border-t border-black/[0.07] bg-paper-sunken">
        <div className="shell">
          <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">Next step</span>
              <h2 className="mt-6 max-w-xl text-headline-xl text-balance">
                Tell us what you need.
              </h2>
              <p className="mt-4 max-w-md text-body-md text-on-surface-variant">
                Setup, consultation or a maintenance contract — we reply the same working day.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={whatsAppLink()} target="_blank" rel="noopener" className="btn btn-whatsapp">
                <IconWhatsApp className="h-4 w-4" /> WhatsApp
              </a>
              <Link href="/contact" className="btn btn-primary group">
                Send an enquiry
                <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
