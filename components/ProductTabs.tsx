'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { IconCheck } from './icons';

export default function ProductTabs({ product }: { product: Product }) {
  const hasMuscles = Boolean(product.muscles?.primary.length || product.targets.length);
  // Order runs from what a buyer reads first to what they check last: what the
  // machine is, what it does, where it goes, what it trains, then the numbers.
  const tabs = [
    'Overview',
    'Features',
    'Applications',
    ...(hasMuscles ? (['Target Muscles'] as const) : []),
    'Specifications',
  ];
  const [active, setActive] = useState<string>('Overview');

  const primary = product.muscles?.primary ?? product.targets;
  const secondary = product.muscles?.secondary ?? [];

  return (
    <div>
      <div role="tablist" aria-label="Product detail" className="no-scrollbar edge-fade-end flex gap-8 overflow-x-auto border-b border-black/[0.08]">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            id={`tab-${t.replace(/\s+/g, '-').toLowerCase()}`}
            aria-selected={active === t}
            aria-controls="product-tabpanel"
            onClick={() => setActive(t)}
            className={`-mb-px whitespace-nowrap border-b-2 pb-4 pt-1 text-label-md uppercase transition-colors duration-micro ${
              active === t
                ? 'border-ink-900 text-ink-900'
                : 'border-transparent text-on-surface-variant hover:text-ink-900'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="product-tabpanel"
        aria-labelledby={`tab-${active.replace(/\s+/g, '-').toLowerCase()}`}
        tabIndex={0}
        className="py-10"
      >
        {active === 'Overview' && (
          <div className="max-w-3xl space-y-4 text-body-md leading-relaxed text-on-surface-variant">
            {product.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {active === 'Specifications' && (
          <div className="max-w-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[320px] border-collapse text-body-sm">
                <tbody>
                  {Object.entries(product.specs).map(([k, v]) => (
                    <tr key={k} className="border-b border-black/[0.07]">
                      <th scope="row" className="w-2/5 py-3.5 pr-4 text-left text-label-sm font-normal uppercase text-on-surface-variant">{k}</th>
                      <td className="py-3.5 font-medium text-ink-900">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!Object.keys(product.specs).some((k) => k.startsWith('Dimensions')) && (
              <p className="mt-6 max-w-prose text-body-sm text-on-surface-variant">
                Dimensions, machine weight, weight-stack size and shipping data are confirmed against the
                production drawing at the time of quotation — we don&rsquo;t publish figures we haven&rsquo;t verified.
              </p>
            )}
          </div>
        )}

        {active === 'Features' && (
          <ul className="grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-body-sm">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        {active === 'Applications' && (
          <div className="max-w-3xl">
            {product.primaryApplication && (
              <div className="mb-8 rounded-xl border-l-2 border-brand bg-paper-sunken px-5 py-4">
                <h3 className="text-label-sm uppercase text-on-surface-variant">Primary application</h3>
                <p className="mt-2 text-body-md">{product.primaryApplication}</p>
              </div>
            )}
            <h3 className="mb-4 text-label-sm uppercase text-on-surface-variant">
              Suitable facilities
            </h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {product.applications.map((a) => (
                <li key={a} className="flex items-start gap-3 text-body-sm">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === 'Target Muscles' && (
          <div className="max-w-3xl">
            {product.bodyAreas.length > 0 && (
              <>
                <h3 className="mb-4 text-label-sm uppercase text-on-surface-variant">Body areas</h3>
                <div className="mb-8 flex flex-wrap gap-2">
                  {product.bodyAreas.map((b) => (
                    <span key={b} className="chip" data-active="true">{b}</span>
                  ))}
                </div>
              </>
            )}
            {primary.length > 0 && (
              <>
                <h3 className="mb-4 text-label-sm uppercase text-on-surface-variant">
                  Primary muscles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {primary.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </>
            )}
            {secondary.length > 0 && (
              <>
                <h3 className="mb-4 mt-9 text-label-sm uppercase text-on-surface-variant">
                  Secondary muscles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {secondary.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
