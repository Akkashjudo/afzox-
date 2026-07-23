import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { BRAND } from '@/lib/catalogue';
import { IconClock, IconMail, IconMapPin, IconPhone } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contact AFZOX',
  description: 'Get in touch with AFZOX Global Strength — phone, email and WhatsApp for gym equipment enquiries across India.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="shell section !pt-8">
      <Reveal>
        <span className="eyebrow">Contact</span>
        <h1 className="mt-4 max-w-2xl text-headline-xl">Let&rsquo;s talk about your gym floor.</h1>
        <p className="mt-3 max-w-xl text-body-md text-on-surface-variant">
          Reach us directly or send your project details below — we typically reply within one
          working hour.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="space-y-4">
          <ContactCard icon={<IconPhone className="h-5 w-5" />} title="Phone" body={BRAND.phone} href={`tel:+${BRAND.phoneRaw}`} />
          <ContactCard icon={<IconMail className="h-5 w-5" />} title="Email" body={BRAND.email} href={`mailto:${BRAND.email}`} />
          <ContactCard icon={<IconMapPin className="h-5 w-5" />} title="Based in" body={`${BRAND.city}, ${BRAND.region}, ${BRAND.country} — shipping nationwide`} />
          <ContactCard icon={<IconClock className="h-5 w-5" />} title="Hours" body="Monday – Saturday, 9:30 am – 7:00 pm IST" />
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, body, href }: { icon: React.ReactNode; title: string; body: string; href?: string }) {
  const inner = (
    <div className="card flex items-start gap-4 p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">{icon}</span>
      <span>
        <span className="block text-xs font-bold uppercase tracking-wide text-on-surface-variant">{title}</span>
        <span className="mt-0.5 block font-semibold">{body}</span>
      </span>
    </div>
  );
  return href ? <a href={href} className="block transition-transform hover:-translate-y-0.5">{inner}</a> : inner;
}
