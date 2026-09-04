'use client';

import { useState } from 'react';
import { BRAND } from '@/lib/catalogue';
import { IconCheck, IconWhatsApp } from './icons';

type Field = 'name' | 'phone' | 'city' | 'message';

/**
 * Enquiry form.
 *
 * It composes a WhatsApp message rather than posting to a server — there is no
 * backend here, and pretending otherwise would silently drop enquiries. The
 * button says exactly what will happen.
 *
 * Validation is deliberately gentle: a field is only marked invalid once it
 * has been left (`blurred`), never while the visitor is still typing, so the
 * form never scolds someone mid-word.
 */
export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({ name: '', phone: '', city: '', message: '' });
  const [blurred, setBlurred] = useState<Partial<Record<Field, boolean>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const errors: Partial<Record<Field, string>> = {};
  if (!values.name.trim()) errors.name = 'Please add your name';
  if (!values.phone.trim()) errors.phone = 'Please add a number we can reach you on';
  else if (values.phone.replace(/\D/g, '').length < 8) errors.phone = 'That number looks too short';
  if (!values.message.trim()) errors.message = 'Tell us briefly what you need';

  const invalid = (k: Field) => Boolean(blurred[k] && errors[k]);
  const canSend = Object.keys(errors).length === 0;

  const waHref = () => {
    const lines = [
      values.name && `Name: ${values.name}`,
      values.phone && `Phone: ${values.phone}`,
      values.city && `Location: ${values.city}`,
      values.message && `Message: ${values.message}`,
    ].filter(Boolean);
    return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(
      `Hi AFZOX, I'd like to get in touch.\n\n${lines.join('\n')}`
    )}`;
  };

  return (
    <form
      noValidate
      className="rounded-2xl border border-black/[0.08] bg-white p-6 md:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setBlurred({ name: true, phone: true, city: true, message: true });
        if (!canSend) return;
        window.open(waHref(), '_blank', 'noopener');
        setSent(true);
      }}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          id="name"
          label="Full name"
          placeholder="Your name"
          value={values.name}
          onChange={set('name')}
          onBlur={() => setBlurred((b) => ({ ...b, name: true }))}
          error={invalid('name') ? errors.name : undefined}
          required
        />
        <TextField
          id="phone"
          label="Phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          value={values.phone}
          onChange={set('phone')}
          onBlur={() => setBlurred((b) => ({ ...b, phone: true }))}
          error={invalid('phone') ? errors.phone : undefined}
          required
        />
      </div>

      <div className="mt-5">
        <TextField
          id="city"
          label="City"
          hint="Optional"
          placeholder="Where is the project?"
          value={values.city}
          onChange={set('city')}
          onBlur={() => setBlurred((b) => ({ ...b, city: true }))}
        />
      </div>

      <div className="mt-5">
        <TextField
          id="message"
          label="Project details"
          as="textarea"
          placeholder="Floor size, opening date, the equipment you have in mind…"
          value={values.message}
          onChange={set('message')}
          onBlur={() => setBlurred((b) => ({ ...b, message: true }))}
          error={invalid('message') ? errors.message : undefined}
          required
        />
      </div>

      <button type="submit" className="btn btn-whatsapp btn-block mt-7">
        {sent ? (
          <>
            <IconCheck className="h-4 w-4" /> Opened in WhatsApp
          </>
        ) : (
          <>
            <IconWhatsApp className="h-4 w-4" /> Continue on WhatsApp
          </>
        )}
      </button>

      <p className="mt-4 text-center text-body-sm text-on-surface-variant" aria-live="polite">
        {sent
          ? 'Your message is pre-filled — press send in WhatsApp to reach us.'
          : 'This opens WhatsApp with your details filled in. Nothing is sent until you press send there.'}
      </p>
    </form>
  );
}

function TextField({
  id,
  label,
  hint,
  error,
  as,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  as?: 'textarea';
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const describedBy = error ? `${id}-error` : undefined;
  const shared = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    className: `field ${error ? 'border-error focus:border-error focus:ring-error/15' : ''}`,
    ...rest,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-label-sm uppercase text-on-surface-variant">{label}</span>
        {hint && <span className="text-label-sm uppercase text-on-surface-variant/50">{hint}</span>}
      </label>

      {as === 'textarea' ? (
        <textarea rows={5} {...(shared as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} className={`${shared.className} resize-none`} />
      ) : (
        <input {...(shared as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}

      {error && (
        <p id={describedBy} className="mt-2 text-body-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
