'use client';

import { useState } from 'react';
import { IconPlus } from './icons';

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-black/5 border-t border-black/5">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen((o) => (o === i ? null : i))}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-6 py-5 text-left"
          >
            <span className="font-bold tracking-tight">{item.q}</span>
            <IconPlus className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`} />
          </button>
          <div
            className="grid overflow-hidden transition-all duration-300"
            style={{ gridTemplateRows: open === i ? '1fr' : '0fr' }}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="max-w-2xl pb-5 text-sm leading-relaxed text-on-surface-variant">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
