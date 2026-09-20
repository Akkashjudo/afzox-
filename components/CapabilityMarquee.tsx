/**
 * Capability marquee — the handover between the hero and product discovery.
 *
 * The terms are the equipment families and services AFZOX actually supplies,
 * taken from the catalogue rather than written as marketing copy: the six
 * families in lib/families.ts plus the two things the business does around
 * them, planning and installation. Nothing here claims a capability the site
 * cannot show a product or a page for.
 *
 * The loop is pure CSS. The track holds two identical copies of the list and
 * translates exactly -50%, so the seam lands on an exact repeat and there is
 * no jump, gap or reset to see. Framer Motion would drive this from JS on
 * every frame for no benefit; a compositor-only transform is both smoother and
 * cheaper, and it keeps running if the main thread is busy.
 *
 * `overflow-hidden` on the section is what stops the over-wide track from
 * giving the page a horizontal scrollbar. Reduced motion needs no special
 * case here: the global rule in globals.css collapses animation duration and
 * iteration count, which parks the track at its start.
 */

const TERMS = [
  'Strength Equipment',
  'Cardio Equipment',
  'Plate Loaded',
  'Selectorized',
  'Functional Training',
  'Benches & Racks',
  'Storage & Racking',
  'Gym Planning',
  'Installation & Service',
];

export default function CapabilityMarquee() {
  const run = [...TERMS, ...TERMS];

  return (
    <section
      aria-label="What AFZOX supplies"
      className="relative overflow-hidden border-y border-white/[0.08] bg-ink-950 py-5 lg:py-6"
    >
      {/* Softens both ends so terms enter and leave rather than being cut. */}
      <div className="edge-fade-x">
        <div className="animate-marquee flex w-max items-center gap-10 lg:gap-14 will-change-transform">
          {run.map((term, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 lg:gap-14">
              <span className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.16em] text-white/75 lg:text-base">
                {term}
              </span>
              <span aria-hidden className="h-1 w-1 shrink-0 rotate-45 bg-primary-fixed-dim" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
