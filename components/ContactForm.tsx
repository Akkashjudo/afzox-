'use client';

import { useState } from 'react';
import { BRAND } from '@/lib/catalogue';
import { IconWhatsApp } from './icons';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const waHref = () => {
    const lines = [
      name && `Name: ${name}`,
      phone && `Phone: ${phone}`,
      city && `Location: ${city}`,
      message && `Message: ${message}`,
    ].filter(Boolean);
    const msg = `Hi AFZOX, I'd like to get in touch.\n\n${lines.join('\n')}`;
    return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <form
      className="card space-y-4 p-6"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(waHref(), '_blank', 'noopener');
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-on-surface-variant">Full Name</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-on-surface-variant">Phone Number</span>
          <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +91 98765 43210" className="field" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-on-surface-variant">City / Location</span>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Where are you located?" className="field" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-on-surface-variant">Message</span>
        <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your project…" className="field resize-none" />
      </label>
      <button type="submit" className="btn btn-whatsapp btn-block !normal-case">
        <IconWhatsApp className="h-4 w-4" /> Send on WhatsApp
      </button>
      <p className="text-center text-xs text-on-surface-variant">
        Submitting opens WhatsApp with your message pre-filled — nothing is sent until you do.
      </p>
    </form>
  );
}
