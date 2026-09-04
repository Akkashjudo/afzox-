'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Collection } from '@/lib/types';
import { DUR, EASE } from './motion/primitives';
import { IconArrow } from './icons';

/**
 * The series selector.
 *
 * Desktop: a row of panels where the hovered one expands and its machine
 * resolves in — one element responding to intent, rather than four cards
 * competing at once. Keyboard focus drives the same expansion, so it is not
 * a mouse-only affordance.
 *
 * The panels are light on purpose: the catalogue photography is shot on
 * white, so a light plate lets each machine sit naturally instead of
 * floating as a bright rectangle on ink. The collapsed state shows the
 * series name and count; the expanded state adds the description and CTA.
 *
 * Mobile: the expansion idea does not survive a narrow viewport, so it
 * recomposes into stacked panels that are all open.
 */
export default function CollectionShowcase({ collections }: { collections: Collection[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <>
      {/* ---------------- DESKTOP ---------------- */}
      <div className="shell mt-14 hidden lg:block">
        <div className="flex h-[540px] gap-3">
          {collections.map((c, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={c.slug}
                className="relative min-w-0 overflow-hidden rounded-2xl border border-black/[0.08] bg-white"
                animate={{ flexGrow: isActive ? 2.7 : 1 }}
                transition={reduce ? { duration: 0 } : { duration: 0.62, ease: EASE }}
                style={{ flexBasis: 0 }}
                onMouseEnter={() => setActive(i)}
              >
                <Link
                  href={c.url}
                  className="group absolute inset-0 flex flex-col"
                  onFocus={() => setActive(i)}
                  aria-label={`${c.displayName} — ${c.count} products`}
                >
                  {/* ---- Machine plate ---- */}
                  <div className="relative flex-1 overflow-hidden bg-paper-sunken">
                    <motion.div
                      className="absolute inset-0"
                      animate={{ opacity: isActive ? 1 : 0.55, scale: isActive ? 1 : 1.06 }}
                      transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE }}
                    >
                      <Image
                        src={c.imageLg}
                        alt=""
                        fill
                        sizes="(max-width:1280px) 50vw, 620px"
                        className="object-contain p-10"
                      />
                    </motion.div>

                    <span className="absolute left-5 top-5 font-display text-label-sm uppercase text-on-surface-variant/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* ---- Detail rail ---- */}
                  <div className="relative border-t border-black/[0.08] bg-white p-6">
                    <p className="whitespace-nowrap font-display text-label-md uppercase text-brand">
                      {c.displayName}
                    </p>

                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, height: isActive ? 'auto' : 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: DUR.section, ease: EASE, delay: isActive ? 0.1 : 0 }
                      }
                      className="overflow-hidden"
                    >
                      <p className="mt-3 max-w-sm text-body-sm text-on-surface-variant">{c.short}</p>
                    </motion.div>

                    <span className="mt-4 flex items-center gap-2 whitespace-nowrap text-label-sm uppercase text-ink-900">
                      {c.count} products
                      <IconArrow className="h-3.5 w-3.5 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ---------------- MOBILE / TABLET ---------------- */}
      <div className="shell mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {collections.map((c, i) => (
          <Link
            key={c.slug}
            href={c.url}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition-[border-color,box-shadow] duration-control ease-afzox hover:border-black/[0.14] hover:shadow-card-hover"
          >
            <div className="relative aspect-[4/3] w-full bg-paper-sunken">
              <Image
                src={c.image}
                alt=""
                fill
                sizes="(max-width:640px) 92vw, 46vw"
                className="object-contain p-7"
              />
              <span className="absolute left-4 top-4 text-label-sm uppercase text-on-surface-variant/60">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="border-t border-black/[0.08] p-5">
              <p className="text-label-md uppercase text-brand">{c.displayName}</p>
              <p className="mt-2 text-body-sm text-on-surface-variant">{c.short}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-label-sm uppercase text-ink-900">
                {c.count} products <IconArrow className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
