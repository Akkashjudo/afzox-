'use client';

import { useState } from 'react';
import { IconPlus } from './icons';

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen((o) => (o === i ? null : i))}
            aria-expanded={open === i}
            className="group flex w-full items-center justify-between gap-6 py-6 text-left"
          >
            <span className="text-headline-sm transition-colors duration-micro group-hover:text-brand">{item.q}</span>
            <IconPlus className={`h-4 w-4 shrink-0 text-on-surface-variant transition-transform duration-control ease-afzox ${open === i ? 'rotate-45 text-brand' : ''}`} />
          </button>
          <div
            className="grid overflow-hidden transition-all duration-control ease-afzox"
            style={{ gridTemplateRows: open === i ? '1fr' : '0fr' }}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="max-w-prose pb-6 text-body-md text-on-surface-variant">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
