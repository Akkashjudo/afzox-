'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { whatsAppLink } from '@/lib/catalogue';
import { useEnquiry } from '@/lib/enquiry-context';
import { IconBag, IconCheck, IconClock, IconMinus, IconPlus, IconShield, IconTool, IconTruck, IconWhatsApp } from './icons';

export default function ProductBuyBox({ product }: { product: Product }) {
  const { add, has, setQty, lines } = useEnquiry();
  const [qty, setLocalQty] = useState(1);
  const inList = has(product.slug);
  const line = lines.find((l) => l.slug === product.slug);

  const handleAdd = () => {
    add(product.slug);
    setQty(product.slug, qty);
  };

  return (
    <div>
      <span className="text-label-md uppercase text-brand">{product.collectionName}</span>
      <h1 className="mt-4 text-headline-xl text-balance">{product.name}</h1>
      <p className="mt-4 max-w-prose text-body-lg text-on-surface-variant">{product.short}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="chip">
          <IconCheck className="h-3 w-3 text-brand" /> In stock
        </span>
        <span className="chip">{product.categoryName}</span>
        <span className="chip">{product.equipmentType}</span>
        {product.bodyAreas.map((b) => (
          <span key={b} className="chip">{b}</span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-label-sm uppercase text-on-surface-variant">Enquiry qty</span>
        <div className="flex items-center rounded-lg border border-outline-variant bg-white">
          <button
            onClick={() => setLocalQty((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center text-on-surface-variant hover:text-on-background"
            aria-label="Decrease quantity"
          >
            <IconMinus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-semibold">{line?.qty ?? qty}</span>
          <button
            onClick={() => setLocalQty((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center text-on-surface-variant hover:text-on-background"
            aria-label="Increase quantity"
          >
            <IconPlus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        <a
          href={whatsAppLink(product.name)}
          target="_blank"
          rel="noopener"
          className="btn btn-whatsapp"
        >
          <IconWhatsApp className="h-4 w-4" /> Enquire on WhatsApp
        </a>
        <div className="flex gap-2.5">
          <button onClick={handleAdd} className="btn btn-secondary flex-1">
            <IconBag className="h-4 w-4" />
            {inList ? 'Added' : 'Add to list'}
          </button>
          <Link href="/enquiry" className="btn btn-primary flex-1">
            Talk to sales
          </Link>
        </div>
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-black/[0.08] pt-8">
        <TrustRow icon={<IconTruck className="h-4 w-4" />} title="PAN-India Delivery" body="Freight quoted by pin code" />
        {/* Only part of the catalogue publishes warranty terms. Where a
            product carries none we say so rather than implying a figure. */}
        <TrustRow icon={<IconShield className="h-4 w-4" />} title="Warranty" body={product.specs['Warranty']?.split('·')[0].trim() ?? 'Terms confirmed at quotation'} />
        <TrustRow icon={<IconClock className="h-4 w-4" />} title="Expert Support" body="Reply within 1 working hour" />
        <TrustRow icon={<IconTool className="h-4 w-4" />} title="Installation" body="Available on commercial setups" />
      </dl>
    </div>
  );
}

function TrustRow({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-brand">{icon}</span>
      <span className="min-w-0">
        <dt className="text-label-sm uppercase text-ink-900">{title}</dt>
        <dd className="mt-1 text-body-sm text-on-surface-variant">{body}</dd>
      </span>
    </div>
  );
}
