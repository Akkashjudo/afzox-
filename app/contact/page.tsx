import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { BRAND, whatsAppLink } from '@/lib/catalogue';
import { IconClock, IconMail, IconMapPin, IconPhone, IconWhatsApp } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contact AFZOX',
  description:
    'Speak to AFZOX Global Strength — phone, email and WhatsApp for commercial gym equipment enquiries across India.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <section className="shell pb-12 pt-16 md:pt-24">
        <span className="eyebrow">Contact</span>
        <h1 className="mt-7 max-w-3xl text-display-lg text-balance">
          Tell us about the floor.
        </h1>
        <p className="mt-7 max-w-prose text-body-lg text-on-surface-variant">
          Dimensions, opening date, the equipment you have in mind — send what you have and
          we’ll come back the same working day.
        </p>
      </section>

      <section className="shell pb-24">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* ---- Direct lines ---- */}
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:h-fit">
            <dl className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white">
              <Row
                icon={<IconPhone className="h-4 w-4" />}
                title="Phone"
                body={BRAND.phone}
                href={`tel:+${BRAND.phoneRaw}`}
              />
              <Row
                icon={<IconMail className="h-4 w-4" />}
                title="Email"
                body={BRAND.email}
                href={`mailto:${BRAND.email}`}
              />
              <Row
                icon={<IconMapPin className="h-4 w-4" />}
                title="Based in"
                body={`${BRAND.city}, ${BRAND.region}, ${BRAND.country}`}
                note="Shipping and installing nationwide"
              />
              <Row
                icon={<IconClock className="h-4 w-4" />}
                title="Hours"
                body="Mon–Sat, 9:30 am – 7:00 pm IST"
              />
            </dl>

            <a
              href={whatsAppLink()}
              target="_blank"
              rel="noopener"
              className="btn btn-whatsapp btn-block mt-4"
            >
              <IconWhatsApp className="h-4 w-4" /> Message us directly
            </a>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}

function Row({
  icon,
  title,
  body,
  note,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  note?: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 border-b border-black/[0.08] p-5 transition-colors duration-micro last:border-b-0 group-hover:bg-paper-sunken">
      <span className="mt-0.5 shrink-0 text-brand">{icon}</span>
      <div className="min-w-0">
        <dt className="text-label-sm uppercase text-on-surface-variant">{title}</dt>
        <dd className="mt-1.5 break-words font-display text-base font-semibold text-ink-900">{body}</dd>
        {note && <dd className="mt-1 text-body-sm text-on-surface-variant">{note}</dd>}
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="group block">
      {content}
    </a>
  ) : (
    <div className="group">{content}</div>
  );
}
