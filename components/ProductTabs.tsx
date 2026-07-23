'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { IconCheck } from './icons';

export default function ProductTabs({ product }: { product: Product }) {
  const tabs = ['Overview', 'Specifications', 'Features', 'Applications'] as const;
  const [active, setActive] = useState<(typeof tabs)[number]>('Overview');

  return (
    <div>
      <div role="tablist" aria-label="Product detail" className="flex gap-1 overflow-x-auto border-b border-black/8">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={active === t}
            onClick={() => setActive(t)}
            className={`whitespace-nowrap border-b-2 px-4 py-3.5 text-sm font-semibold transition-colors ${
              active === t ? 'border-primary text-on-background' : 'border-transparent text-on-surface-variant hover:text-on-background'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="py-8">
        {active === 'Overview' && (
          <div className="max-w-3xl space-y-4 text-body-md leading-relaxed text-on-surface-variant">
            {product.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {active === 'Specifications' && (
          <table className="w-full max-w-2xl border-collapse text-sm">
            <tbody>
              {Object.entries(product.specs).map(([k, v]) => (
                <tr key={k} className="border-b border-black/5">
                  <th scope="row" className="w-2/5 py-3 pr-4 text-left font-medium text-on-surface-variant">{k}</th>
                  <td className="py-3 font-semibold">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {active === 'Features' && (
          <ul className="grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        {active === 'Applications' && (
          <div className="max-w-3xl">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {product.applications.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 mb-3 text-sm font-bold uppercase tracking-wide text-on-surface-variant">
              Body parts targeted
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.targets.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
