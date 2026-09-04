import { CATALOGUES } from '@/lib/catalogues';
import Reveal from './Reveal';
import { IconArrow } from './icons';

/**
 * Catalogue library.
 *
 * Each row opens the source PDF in a new tab (View) or saves it (Download).
 * Page count and file size are stated up front so nobody on mobile data taps
 * a 13 MB file blind.
 */
export default function CatalogueDownloads() {
  return (
    <section className="section-tight border-t border-black/[0.07] bg-paper-sunken">
      <div className="shell">
        <Reveal>
          <span className="eyebrow">Catalogues</span>
          <h2 className="mt-6 text-headline-xl">Download the AFZOX catalogues</h2>
          <p className="mt-4 max-w-prose text-body-md text-on-surface-variant">
            The source catalogues behind every product on this site. Open one in the browser or
            save it to send on.
          </p>
        </Reveal>

        <ul className="mt-10 overflow-hidden rounded-2xl border border-black/[0.08] bg-white">
          {CATALOGUES.map((c, i) => (
            <li
              key={c.slug}
              className={`group flex flex-col gap-4 p-5 transition-colors duration-micro hover:bg-paper-sunken sm:flex-row sm:items-center sm:gap-6 sm:p-6 ${
                i > 0 ? 'border-t border-black/[0.08]' : ''
              }`}
            >
              <span className="shrink-0 font-display text-label-sm uppercase text-brand">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="text-headline-sm">{c.title}</h3>
                <p className="mt-1.5 text-body-sm text-on-surface-variant">{c.scope}</p>
                <p className="mt-2 text-label-sm uppercase text-on-surface-variant/70">
                  PDF · {c.pages} pages · {c.sizeMb} MB
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <a
                  href={c.file}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-sm btn-secondary"
                  aria-label={`View the ${c.title} catalogue (PDF, ${c.sizeMb} MB)`}
                >
                  View
                </a>
                <a
                  href={c.file}
                  download
                  className="btn btn-sm btn-primary group/dl"
                  aria-label={`Download the ${c.title} catalogue (PDF, ${c.sizeMb} MB)`}
                >
                  Download
                  <IconArrow className="h-3.5 w-3.5 rotate-90 transition-transform duration-control ease-afzox group-hover/dl:translate-y-0.5" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
