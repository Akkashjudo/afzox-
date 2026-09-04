import { RevealText, StaggerGroup, StaggerItem } from './motion/primitives';

/**
 * Sticky-column storytelling. The statement holds on the left while the
 * points scroll past it on the right — the page reads as one continuous
 * argument rather than four sibling cards.
 *
 * Every claim below is one the catalogue can back: published per-machine
 * specifications, stocked spares, own-team installation, free layout. No
 * tube gauge, warranty term or installation count is asserted here — those
 * vary per machine and are printed on each product page from the product
 * data itself.
 */
const POINTS = [
  {
    n: '01',
    title: 'Specifications published, not implied',
    body: 'Every machine page carries its own specification table — frame, finish, upholstery, resistance type and, where the range publishes them, dimensions and stack weight. Figures that are not confirmed are left off rather than estimated.',
  },
  {
    n: '02',
    title: 'Installed by our own technicians',
    body: 'Delivery, levelling, bolt-down and handover are carried out by AFZOX teams rather than subcontracted at the last mile.',
  },
  {
    n: '03',
    title: 'Spares held for what we ship',
    body: 'Cables, bearings, bushings, pop-pins and upholstery panels are stocked against the models in the catalogue, so a worn part does not take a station out of service for a season.',
  },
  {
    n: '04',
    title: 'Floor layout before you commit',
    body: 'Send the room dimensions and we return a scaled equipment layout — no obligation, and no assumption that the biggest schedule is the right one.',
  },
];

export default function BuildStandard() {
  return (
    <section className="section relative">
      <div className="shell grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* ---- Sticky statement ---- */}
        <div className="lg:sticky lg:top-[calc(var(--header-h)+56px)] lg:h-fit">
          <span className="eyebrow">The build standard</span>
          <RevealText
            as="h2"
            className="mt-6 text-headline-xl [text-wrap:balance]"
            lines={['We manufacture it,', 'so we answer for it.']}
          />
          <p className="mt-6 max-w-md text-body-md text-on-surface-variant">
            The catalogue is built to be specified from — which means being straight about
            what is confirmed and what is not.
          </p>
        </div>

        {/* ---- Scrolling points ---- */}
        <StaggerGroup className="flex flex-col">
          {POINTS.map((p) => (
            <StaggerItem key={p.n}>
              <article className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-black/[0.08] py-8 first:border-t-0 first:pt-0 md:gap-x-10 md:py-10">
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
  );
}
