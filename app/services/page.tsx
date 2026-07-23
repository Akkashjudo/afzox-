import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { CATEGORIES, whatsAppLink } from '@/lib/catalogue';
import { IconArrow, IconClipboard, IconLayers, IconRuler, IconShield, IconTool, IconTruck } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Commercial Gym Setup & Services',
  description: 'Turnkey commercial gym setup, home gym consultation and annual maintenance contracts from AFZOX — layout, manufacture, delivery and installation across India.',
  alternates: { canonical: '/services' },
};

const SERVICES = [
  {
    icon: IconLayers,
    title: 'Commercial Gym Setup',
    body: 'End-to-end fit-outs for gyms, hotels and fitness clubs — floor layout, equipment schedule, manufacture, delivery and on-site installation from a single team.',
    points: ['Free scaled floor layout', 'Itemised equipment schedule', 'Phased delivery for multi-zone floors', 'Staff walkthrough on handover'],
  },
  {
    icon: IconRuler,
    title: 'Home Gym Consultation',
    body: 'Space-aware recommendations for residential and apartment gyms — equipment sized to the room, not the showroom.',
    points: ['Room-dimension equipment fit', 'Noise and floor-load guidance', 'Compact multi-station options', 'Direct WhatsApp consultation'],
  },
  {
    icon: IconTool,
    title: 'Annual Maintenance Contracts',
    body: 'Scheduled preventive servicing with a documented checklist — cable tension, bearing play, upholstery integrity and fastener torque on every station.',
    points: ['Scheduled site visits', 'Documented service checklist', 'Genuine stocked spares', 'Priority breakdown response'],
  },
];

const PROCESS = [
  { step: '01', title: 'Consultation', body: 'We take your floor dimensions, target membership and budget band, then recommend an equipment mix suited to how the space will be used.' },
  { step: '02', title: 'Layout & Quote', body: 'A scaled 2D layout with station spacing and circulation, plus an itemised quotation you can take to your board or your bank.' },
  { step: '03', title: 'Manufacture & Delivery', body: 'Production, quality inspection and crated dispatch, tracked to your site with a confirmed delivery window.' },
  { step: '04', title: 'Install & Handover', body: 'On-site assembly, levelling, bolt-down where required, a staff walkthrough, and the AMC schedule set up before we leave.' },
];

export default function ServicesPage() {
  return (
    <>
      <section className="shell section !pb-10 !pt-8">
        <Reveal>
          <span className="eyebrow">Services</span>
          <h1 className="mt-4 max-w-3xl text-display-lg text-balance">Setup, delivered end to end.</h1>
          <p className="mt-5 max-w-2xl text-body-lg text-on-surface-variant">
            From a single machine to a full commercial floor — we design, manufacture, deliver
            and install, then keep it running with scheduled maintenance.
          </p>
        </Reveal>
      </section>

      <section className="shell pb-16">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={0.06 * i}>
              <div className="card flex h-full flex-col p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <s.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-headline-sm">{s.title}</h2>
                <p className="mt-3 text-sm text-on-surface-variant">{s.body}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <IconShield className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {p}
                    </li>
                  ))}
                </ul>
                <a href={whatsAppLink()} target="_blank" rel="noopener" className="btn btn-secondary btn-sm mt-auto pt-2 !normal-case">
                  Enquire about this service
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-surface">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">How a project runs</span>
            <h2 className="mt-3 text-headline-xl">From floor plan to first member.</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={0.05 * i}>
                <div className="card p-6">
                  <span className="font-mono text-xs font-bold text-primary">Step {p.step}</span>
                  <h3 className="mt-2 font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Equipment ranges</span>
            <h2 className="mt-3 text-headline-xl">Every service draws from the same catalogue</h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={c.url} className="chip !py-2 !px-4 hover:border-primary hover:text-primary">
                {c.name} <IconArrow className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section !pt-0 text-center">
        <Reveal className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-white md:px-16 md:py-20">
          <div className="flex items-center justify-center gap-3 text-primary-fixed-dim">
            <IconTruck className="h-5 w-5" /> <IconClipboard className="h-5 w-5" /> <IconTool className="h-5 w-5" />
          </div>
          <h2 className="mt-5 text-headline-xl">Get a service quote today</h2>
          <p className="mx-auto mt-3 max-w-xl text-body-md text-white/65">
            Tell us what you need — setup, consultation, or an AMC — and we&rsquo;ll respond the
            same working day.
          </p>
          <a href={whatsAppLink()} target="_blank" rel="noopener" className="btn btn-whatsapp mt-7 inline-flex">
            Chat on WhatsApp
          </a>
        </Reveal>
      </section>
    </>
  );
}
