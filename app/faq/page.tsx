import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import Accordion from '@/components/Accordion';
import { whatsAppLink } from '@/lib/catalogue';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Delivery, lead times, custom colours, installation, warranty and financing — answers before you enquire with AFZOX.',
  alternates: { canonical: '/faq' },
};

const FAQS = [
  { q: 'Do you deliver outside Tamil Nadu?', a: 'Yes. We ship and install across India, including the North East and union territories. Freight is quoted separately and transparently based on your pin code and the equipment volume — it is never buried inside the machine price.' },
  { q: 'What is the lead time on an order?', a: 'Stocked models dispatch in 7–10 working days. Full commercial fit-outs and custom colourways run 4–6 weeks from confirmed order, and we give you a production date in writing rather than a rolling estimate.' },
  { q: 'Can I order a custom colour?', a: 'Frames and upholstery can be matched to your brand palette on orders above a minimum quantity. Our standard finishes are matte black, brushed Titanium, and the Crimson and Emerald accent lines you can see throughout the catalogue.' },
  { q: 'Is installation included?', a: 'Installation by AFZOX technicians is included on complete gym setups. For individual machines it is quoted as a line item so you can choose to install in-house. Either way you get the torque specifications and the commissioning checklist.' },
  { q: 'What does the warranty actually cover?', a: 'Frame warranty covers structural welds and steel for the stated term. Moving parts covers bearings, bushings, pop-pins and pulleys. Upholstery and cables are wear items with their own term. Exact cover for each machine is printed on its product page.' },
  { q: 'Do you finance or lease equipment?', a: 'We work with equipment finance partners who lend against commercial gym assets, and we can supply the documentation they require. Talk to us early — it usually changes what specification is realistic for your opening budget.' },
  { q: 'How do I get an exact price?', a: 'We don’t publish list prices because commercial pricing depends on quantity, specification and delivery location. Add machines to your enquiry list or message us on WhatsApp and we’ll come back with a formal quotation the same working day.' },
];

export default function FaqPage() {
  return (
    <div className="shell section !pt-8">
      <div className="max-w-3xl">
      {/* Above the fold — renders immediately, no scroll-reveal gating. */}
      <span className="eyebrow">Questions</span>
      <h1 className="mt-4 text-headline-xl">Before you enquire</h1>
      <p className="mt-3 text-body-md text-on-surface-variant">
        Can&rsquo;t find an answer here? Message us directly and we&rsquo;ll get back to you the
        same working day.
      </p>

      <div className="mt-8">
        <Accordion items={FAQS} />
      </div>

      <Reveal delay={0.16} className="mt-10 text-center">
        <a href={whatsAppLink()} target="_blank" rel="noopener" className="btn btn-whatsapp inline-flex">
          Ask us on WhatsApp
        </a>
      </Reveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}
