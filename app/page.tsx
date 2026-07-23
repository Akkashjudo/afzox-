import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, PRODUCTS, featuredProducts, whatsAppLink } from '@/lib/catalogue';
import { IconArrow, IconAward, IconShield, IconTool, IconUsers } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Commercial Gym Equipment Manufacturer & Supplier in India',
  description:
    'Build elite gyms with professional equipment. Plate loaded and pin loaded machines, racks, benches, cable stations and studio cardio — 45 machines, manufactured and installed across India.',
  alternates: { canonical: '/' },
};

const heroCategories = CATEGORIES.slice(0, 5);
const large = heroCategories[0];
const small = heroCategories.slice(1, 5);

export default function HomePage() {
  return (
    <>
      <Hero
        heroProduct={featuredProducts(1)[0]}
        stats={[
          { icon: <IconShield className="h-4 w-4" />, value: '500+', label: 'Gyms Equipped' },
          { icon: <IconAward className="h-4 w-4" />, value: '45+', label: 'Machines Catalogued' },
          { icon: <IconTool className="h-4 w-4" />, value: 'PAN India', label: 'Delivery & Install' },
        ]}
      />

      <TrustStrip />

      {/* ---------- SHOP BY CATEGORY ---------- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <h2 className="text-headline-xl">
              Shop By <span className="text-primary">Category</span>
            </h2>
            <p className="mt-3 max-w-xl text-body-md text-on-surface-variant">
              Precision-engineered equipment collections designed for ultimate performance and
              aesthetic excellence.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <CategoryCard category={large} large />
            </Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-rows-2">
              {small.map((c, i) => (
                <Reveal key={c.slug} delay={0.06 * (i + 1)}>
                  <CategoryCard category={c} />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-8 text-center">
            <Link href="/categories" className="group inline-flex items-center gap-2 font-semibold text-primary">
              View all {CATEGORIES.length} ranges <IconArrow className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- BEST SELLERS ---------- */}
      <section className="section bg-surface">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <span className="eyebrow">Most specified</span>
              <h2 className="mt-3 text-headline-xl">Best Sellers</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <Link href="/shop" className="group inline-flex items-center gap-2 font-semibold text-primary">
                View all {PRODUCTS.length} machines <IconArrow className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Below the hero fold on every breakpoint — lazy-load all of these
                rather than competing with the hero image for initial bandwidth. */}
            {featuredProducts(8).map((p, i) => (
              <Reveal key={p.slug} delay={0.04 * (i % 4)}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY AFZOX ---------- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Why AFZOX</span>
            <h2 className="mt-3 max-w-xl text-headline-xl">We manufacture it, so we stand behind it.</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <IconShield className="h-5 w-5" />, title: 'Structural steel, not tube', body: '75×150mm rectangular section at 3mm wall on load-bearing frames. Fully welded joints.' },
              { icon: <IconTool className="h-5 w-5" />, title: 'Installed by our own team', body: 'Delivery, levelling, bolt-down and handover by AFZOX technicians nationwide.' },
              { icon: <IconAward className="h-5 w-5" />, title: 'Spares held in stock', body: 'Cables, bearings, pop-pins and upholstery panels stocked for every model we ship.' },
              { icon: <IconUsers className="h-5 w-5" />, title: 'Free floor layout', body: 'Send your dimensions — we return a scaled equipment layout at no obligation.' },
            ].map((v, i) => (
              <Reveal key={v.title} delay={0.05 * i}>
                <div className="card p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {v.icon}
                  </div>
                  <h3 className="font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section">
        <div className="shell">
          <Reveal className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-white md:px-16 md:py-20">
            <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 -z-10" />
            <h2 className="text-headline-xl">Tell us the floor size. We&rsquo;ll do the rest.</h2>
            <p className="mx-auto mt-4 max-w-xl text-body-md text-white/65">
              Send your dimensions and target opening date on WhatsApp for an indicative equipment
              schedule the same working day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={whatsAppLink()} target="_blank" rel="noopener" className="btn btn-whatsapp">
                Chat on WhatsApp
              </a>
              <Link href="/contact" className="btn btn-ghost !bg-white/10 !text-white !border-white/25 hover:!bg-white hover:!text-ink">
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
