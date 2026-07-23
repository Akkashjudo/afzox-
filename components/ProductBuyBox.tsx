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
      <span className="eyebrow">{product.usage}</span>
      <h1 className="mt-3 text-headline-lg text-balance">{product.name}</h1>
      <p className="mt-2 text-body-md text-on-surface-variant">{product.short}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="chip">
          <IconCheck className="h-3 w-3 text-primary" /> In Stock
        </span>
        <span className="chip">{product.categoryName}</span>
        <span className="chip">{product.tier}</span>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Enquiry Qty</span>
        <div className="flex items-center rounded-full border border-outline-variant">
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
        <button onClick={handleAdd} className="btn btn-secondary !normal-case">
          <IconBag className="h-4 w-4" />
          {inList ? 'Added to Enquiry List' : 'Add to Enquiry List'}
        </button>
        <Link href="/enquiry" className="btn btn-primary !normal-case">
          Talk to Sales
        </Link>
        <a
          href={whatsAppLink(product.name)}
          target="_blank"
          rel="noopener"
          className="btn btn-whatsapp !normal-case"
        >
          <IconWhatsApp className="h-4 w-4" /> Enquire on WhatsApp
        </a>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-black/5 pt-6 text-xs">
        <TrustRow icon={<IconTruck className="h-4 w-4" />} title="PAN-India Delivery" body="Freight quoted by pin code" />
        <TrustRow icon={<IconShield className="h-4 w-4" />} title="Warranty" body={product.specs['Warranty']?.split('·')[0].trim() ?? 'Structural warranty'} />
        <TrustRow icon={<IconClock className="h-4 w-4" />} title="Expert Support" body="Reply within 1 working hour" />
        <TrustRow icon={<IconTool className="h-4 w-4" />} title="Installation" body="Available on commercial setups" />
      </div>
    </div>
  );
}

function TrustRow({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-primary">{icon}</span>
      <span>
        <span className="block font-semibold text-on-background">{title}</span>
        <span className="block text-on-surface-variant">{body}</span>
      </span>
    </div>
  );
}
