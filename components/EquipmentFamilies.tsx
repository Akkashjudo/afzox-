'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { DUR, EASE, STAGGER } from './motion/primitives';
import { IconArrow } from './icons';

export type FamilyCard = {
  slug: string;
  name: string;
  blurb: string;
  href: string;
  thumb: string;
  thumbAlt: string;
};

/**
 * Primary product discovery, directly under the marquee.
 *
 * Six categories, each a picture of a real machine that links straight to that
 * equipment already filtered. Nothing here asks the visitor to understand the
 * catalogue's shape first: no series, no body area, no equipment-type
 * vocabulary, no counts — a photograph, a name, and one action.
 *
 * It replaced a rail of tabs that swapped a product grid in place. That put
 * the burden the wrong way round: you had to operate a control and interpret
 * the result before you could tell whether the category was the one you
 * wanted. A card that looks like a treadmill and says Cardio is understood
 * before it is used, and one tap lands on the equipment rather than on a
 * filter state to configure.
 *
 * Every `href` is a real catalogue URL with the filter applied, so the link is
 * shareable, the back button behaves, and a reload keeps the category.
 */
export default function EquipmentFamilies({ families }: { families: FamilyCard[] }) {
  const reduce = useReducedMotion();

  return (
    <section className="section bg-paper">
      <div className="shell">
        <div className="max-w-2xl">
          <span className="eyebrow">Find equipment</span>
          <h2 className="mt-4 text-display-sm font-bold tracking-tight text-ink-900">
            What are you fitting out?
          </h2>
          <p className="mt-5 max-w-prose text-body-lg text-on-surface-variant">
            Pick a category to see the machines in it.
          </p>
        </div>

        {/* Two across on a phone rather than a swipe rail: six cards is a
            glanceable whole, and a horizontal rail hides half of them behind a
            gesture the visitor has to discover. */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {families.map((f, i) => (
            <motion.div
              key={f.slug}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: DUR.control,
                ease: EASE,
                delay: reduce ? 0 : Math.min(i * STAGGER.tight, 0.2),
              }}
            >
              {/* One <a> wrapping the whole card: the entire tile is the touch
                  target on a phone and a single tab stop on a keyboard, and
                  nothing here depends on hover to be usable. */}
              <Link
                href={f.href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-black/[0.08] bg-white transition-all duration-control ease-afzox hover:-translate-y-0.5 hover:border-black/20 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                {/* Fixed 4:3 plate, `object-contain` and equal padding, so a
                    treadmill and a dumbbell rack are drawn at the same scale
                    against the same ground rather than one filling the tile
                    and the next floating in it. The plate is white because the
                    catalogue photographs already carry a white ground — on the
                    sunken grey each one read as a white rectangle pasted into
                    a grey card. */}
                <span className="relative block aspect-[4/3] w-full overflow-hidden bg-white">
                  <Image
                    src={f.thumb}
                    alt={f.thumbAlt}
                    fill
                    sizes="(max-width:640px) 46vw, (max-width:1024px) 45vw, 30vw"
                    className="object-contain p-4 transition-transform duration-500 ease-afzox group-hover:scale-[1.03] sm:p-6"
                  />
                </span>

                <span className="flex flex-1 flex-col gap-1.5 border-t border-black/[0.06] px-4 pb-4 pt-3.5 sm:px-5 sm:pb-5">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-base font-bold leading-tight tracking-tight text-ink-900 sm:text-lg">
                      {f.name}
                    </span>
                    <IconArrow className="ml-auto h-4 w-4 shrink-0 text-on-surface-variant transition-transform duration-control ease-afzox group-hover:translate-x-1 group-hover:text-brand" />
                  </span>
                  <span className="hidden text-body-sm text-on-surface-variant sm:block">
                    {f.blurb}
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 lg:mt-10">
          <Link href="/shop" className="group cta-text">
            View all equipment
            <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
