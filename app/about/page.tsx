import type { Metadata } from 'next';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { PRODUCTS, whatsAppLink } from '@/lib/catalogue';
import { IconAward, IconShield, IconTool, IconUsers } from '@/components/icons';

export const metadata: Metadata = {
  title: 'About AFZOX',
  description: 'AFZOX manufactures commercial gym equipment in India — structural steel machines, delivered and installed by our own technicians nationwide.',
  alternates: { canonical: '/about' },
};

const VALUES = [
  { icon: IconShield, title: 'Built to be trusted', body: 'Every machine is engineered around structural steel, sealed bearings and a phosphate-then-powder finish — built for continuous commercial duty cycles, not occasional home use.' },
  { icon: IconTool, title: 'Manufactured, not imported', body: 'We run our own fabrication and powder-coat line. That means we control tolerances, lead times and quality at the source instead of reselling someone else’s container.' },
  { icon: IconAward, title: 'Accountable after the sale', body: 'Spares — cables, bearings, pop-pins, upholstery — are stocked for every model we’ve shipped. Annual maintenance contracts keep equipment audited, not just installed.' },
  { icon: IconUsers, title: 'One team, start to finish', body: 'The same organisation that designs the layout also manufactures the equipment and installs it on-site — no handoffs between a sales agent, an importer and a third-party fitter.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Above the fold — renders immediately, no scroll-reveal gating. */}
      <section className="shell section !pb-10 !pt-8">
        <span className="eyebrow">About AFZOX</span>
        <h1 className="mt-4 max-w-3xl text-display-lg text-balance">
          Precision engineering meets <span className="text-primary">high-end design.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-body-lg text-on-surface-variant">
          AFZOX Global Strength designs and manufactures commercial gym equipment out of
          Chennai, Tamil Nadu — supplying and installing complete fitness floors for gyms,
          hotels and residential projects across India.
        </p>
      </section>

      <section className="shell grid grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-surface-container">
          <Image src={PRODUCTS[10].image} alt="AFZOX manufactured commercial gym equipment" fill priority sizes="(max-width:1024px) 90vw, 45vw" className="object-contain p-10" />
        </div>
        <div>
          <h2 className="text-headline-lg">Why we exist</h2>
          <div className="mt-4 space-y-4 text-body-md text-on-surface-variant">
            <p>
              Most equipment suppliers in this market are importers with a warehouse — a name on
              an invoice between you and a factory you&rsquo;ll never speak to. AFZOX exists because
              gym owners kept asking for something simpler: one company that designs the layout,
              builds the equipment, and stands behind it after the doors open.
            </p>
            <p>
              Every frame that leaves our facility is fully welded structural steel, not
              bolt-together tube. Every finish goes through a phosphate treatment before
              electrostatic powder coat, because a humid Indian gym floor is a harder test than a
              showroom. And every delivery is followed by our own installation team, not a
              courier leaving crates at the door.
            </p>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-6">
            <div><dt className="text-3xl font-extrabold tracking-tight text-primary">{PRODUCTS.length}</dt><dd className="mt-1 text-sm text-on-surface-variant">Machines in catalogue</dd></div>
            <div><dt className="text-3xl font-extrabold tracking-tight text-primary">500+</dt><dd className="mt-1 text-sm text-on-surface-variant">Gyms equipped</dd></div>
            <div><dt className="text-3xl font-extrabold tracking-tight text-primary">7</dt><dd className="mt-1 text-sm text-on-surface-variant">Equipment ranges</dd></div>
            <div><dt className="text-3xl font-extrabold tracking-tight text-primary">PAN India</dt><dd className="mt-1 text-sm text-on-surface-variant">Delivery &amp; install</dd></div>
          </dl>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="shell">
          <Reveal><h2 className="text-headline-xl">What we stand for</h2></Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.05 * i}>
                <div className="card p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section text-center">
        <Reveal>
          <h2 className="text-headline-lg">Planning a gym floor?</h2>
          <p className="mx-auto mt-3 max-w-xl text-body-md text-on-surface-variant">
            Send us your dimensions and we&rsquo;ll return a free equipment layout — no obligation.
          </p>
          <a href={whatsAppLink()} target="_blank" rel="noopener" className="btn btn-primary mt-6 inline-flex">
            Talk to Sales
          </a>
        </Reveal>
      </section>
    </>
  );
}
