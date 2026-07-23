'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { IconZoom } from './icons';

const CROPS = [
  { label: 'Full view', pos: '50% 50%', zoom: 1 },
  { label: 'Upper assembly', pos: '50% 18%', zoom: 1.9 },
  { label: 'Frame & base', pos: '50% 88%', zoom: 1.9 },
  { label: 'Loading detail', pos: '18% 55%', zoom: 2.1 },
];

export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('center');
  const crop = CROPS[active];

  return (
    <div>
      <button
        type="button"
        className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-br from-surface to-surface-container"
        onClick={() => setZoomed((z) => !z)}
        onMouseMove={(e) => {
          if (!zoomed) return;
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
        }}
        aria-label={zoomed ? 'Zoomed in — press to zoom out' : 'Product image — press to zoom in'}
      >
        <Image
          src={product.image}
          alt={`${product.name} — ${crop.label.toLowerCase()}`}
          fill
          priority
          sizes="(max-width:960px) 92vw, 46vw"
          className="object-contain p-8 transition-transform duration-300"
          style={{
            transform: zoomed ? `scale(${2.1})` : crop.zoom > 1 ? `scale(${crop.zoom})` : 'none',
            transformOrigin: zoomed ? origin : crop.pos,
          }}
        />
        {!zoomed && (
          <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant backdrop-blur">
            <IconZoom className="h-3.5 w-3.5" /> Click to zoom
          </span>
        )}
      </button>

      <div className="mt-3 flex gap-2.5">
        {CROPS.map((c, i) => (
          <button
            key={c.label}
            onClick={() => { setActive(i); setZoomed(false); }}
            aria-current={active === i}
            aria-label={`${product.name} — ${c.label}`}
            className={`relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-xl border-2 bg-gradient-to-br from-surface to-surface-container transition-colors ${
              active === i ? 'border-primary' : 'border-transparent hover:border-outline-variant'
            }`}
          >
            <Image
              src={product.imageSm}
              alt=""
              fill
              sizes="68px"
              className="object-contain p-2"
              style={{ transform: c.zoom > 1 ? `scale(${c.zoom})` : 'none', transformOrigin: c.pos }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
