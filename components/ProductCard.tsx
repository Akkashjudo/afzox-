'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { whatsAppLink } from '@/lib/catalogue';
import { IconWhatsApp } from './icons';

export default function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  return (
    <article className="card card-hover group relative flex flex-col overflow-hidden">
      <Link href={`/product/${product.slug}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`} />
      <div className="relative aspect-[4/3.4] overflow-hidden bg-gradient-to-br from-surface to-surface-container">
        <span className="absolute left-3 top-3 z-20 rounded-full border border-black/5 bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant backdrop-blur">
          {product.categoryName}
        </span>
        {product.featured && (
          <span className="absolute right-3 top-3 z-20 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-on-primary">
            Best Seller
          </span>
        )}
        <Image
          src={product.imageMd}
          alt={`${product.name} — AFZOX ${product.categoryName.toLowerCase()}`}
          fill
          sizes="(max-width:640px) 90vw, (max-width:1100px) 44vw, 320px"
          className="object-contain p-7 transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <span className="font-mono text-[10px] tracking-widest text-on-surface-variant/70">{product.sku}</span>
        <h3 className="text-[1.05rem] font-bold leading-tight tracking-tight">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-on-surface-variant">{product.short}</p>
        <div className="relative z-20 mt-auto flex gap-2 pt-3">
          <Link href={`/product/${product.slug}`} className="btn btn-secondary btn-sm flex-1 !normal-case">
            View Details
          </Link>
          <a
            href={whatsAppLink(product.name)}
            target="_blank"
            rel="noopener"
            className="btn btn-whatsapp btn-sm flex-1 !normal-case"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
          >
            <IconWhatsApp className="h-4 w-4" /> Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
