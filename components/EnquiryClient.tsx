'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useEnquiry } from '@/lib/enquiry-context';
import { getProduct, whatsAppLinkMulti } from '@/lib/catalogue';
import Reveal from '@/components/Reveal';
import { IconArrow, IconEmpty, IconMinus, IconPlus, IconTrash, IconWhatsApp } from '@/components/icons';

export default function EnquiryClient() {
  const { lines, remove, setQty, clear } = useEnquiry();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const items = useMemo(
    () => lines.map((l) => ({ ...l, product: getProduct(l.slug) })).filter((l) => l.product),
    [lines]
  );

  const waHref = useMemo(() => {
    const names = items.map((i) => `${i.product!.name}${i.qty > 1 ? ` × ${i.qty}` : ''}`);
    const details = [
      name && `Name: ${name}`,
      phone && `Phone: ${phone}`,
      location && `Location: ${location}`,
      message,
    ]
      .filter(Boolean)
      .join('\n');
    return whatsAppLinkMulti(names, details || undefined);
  }, [items, name, phone, location, message]);

  return (
    <div className="shell section !pt-8">
      <Reveal>
        <h1 className="text-headline-xl">Enquiry List</h1>
        <Link href="/shop" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-primary">
          <IconArrow className="h-3.5 w-3.5 rotate-180" /> Continue browsing
        </Link>
      </Reveal>

      {items.length === 0 ? (
        <Reveal delay={0.1} className="mt-16 text-center">
          <IconEmpty className="mx-auto h-14 w-14 text-outline-variant" />
          <h2 className="mt-5 text-headline-sm">Your enquiry list is empty</h2>
          <p className="mt-2 text-sm text-on-surface-variant">Add machines from the catalogue to request a combined quotation.</p>
          <Link href="/shop" className="btn btn-primary mt-6">Browse Equipment</Link>
        </Reveal>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* ---------- LINE ITEMS ---------- */}
          <div className="space-y-4">
            {items.map(({ slug, qty, product }, i) => (
              <Reveal key={slug} delay={0.04 * i}>
                <div className="card flex gap-4 p-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-surface to-surface-container">
                    <Image src={product!.imageSm} alt={product!.name} fill sizes="96px" className="object-contain p-2" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wide text-primary">{product!.categoryName}</span>
                        <h3 className="font-bold leading-snug">
                          <Link href={`/product/${slug}`} className="hover:text-primary">{product!.name}</Link>
                        </h3>
                      </div>
                      <button onClick={() => remove(slug)} aria-label={`Remove ${product!.name}`} className="text-on-surface-variant hover:text-error">
                        <IconTrash className="h-[18px] w-[18px]" />
                      </button>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-on-surface-variant">{product!.short}</p>
                    <div className="mt-auto flex items-center rounded-full border border-outline-variant w-fit">
                      <button onClick={() => setQty(slug, qty - 1)} className="flex h-8 w-8 items-center justify-center text-on-surface-variant" aria-label="Decrease quantity">
                        <IconMinus className="h-3 w-3" />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold">{qty}</span>
                      <button onClick={() => setQty(slug, qty + 1)} className="flex h-8 w-8 items-center justify-center text-on-surface-variant" aria-label="Increase quantity">
                        <IconPlus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <button onClick={clear} className="text-sm font-medium text-on-surface-variant hover:text-error">
              Clear enquiry list
            </button>
          </div>

          {/* ---------- SUMMARY / LEAD FORM ---------- */}
          <Reveal delay={0.1}>
            <form
              className="card lg:sticky lg:top-[104px] p-6"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(waHref, '_blank', 'noopener');
              }}
            >
              <h2 className="font-bold">Enquiry Summary</h2>
              <p className="mt-2 text-sm text-on-surface-variant">
                Share your details below to receive a customised quote for the {items.length} item{items.length === 1 ? '' : 's'} in your list.
              </p>

              <div className="mt-5 space-y-4">
                <Field label="Full Name">
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="field" />
                </Field>
                <Field label="Phone Number">
                  <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +91 98765 43210" className="field" />
                </Field>
                <Field label="Location (City/State)">
                  <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Where are you located?" className="field" />
                </Field>
                <Field label="Message (Optional)">
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Any specific requirements?" className="field resize-none" />
                </Field>
              </div>

              <p className="mt-4 rounded-xl bg-surface p-3 text-xs italic text-on-surface-variant">
                Note: pricing is shared on request based on quantity, specification and delivery location.
              </p>

              <button type="submit" className="btn btn-whatsapp btn-block mt-4 !normal-case">
                <IconWhatsApp className="h-4 w-4" /> Send Enquiry on WhatsApp
              </button>
              <p className="mt-3 text-center text-xs text-on-surface-variant">Your enquiry is routed directly to our sales team.</p>
            </form>
          </Reveal>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-on-surface-variant">{label}</span>
      {children}
    </label>
  );
}
