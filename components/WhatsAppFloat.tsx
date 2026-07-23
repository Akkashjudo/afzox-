'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getProduct, whatsAppLink } from '@/lib/catalogue';
import { IconWhatsApp } from './icons';

/** Single global floating WhatsApp CTA — auto-detects a product page and
 *  pre-fills the enquiry message with that product's name.
 *
 *  Stays hidden for the first ~150px of scroll: on short mobile viewports
 *  the hero's own headline/CTAs/stat cards sit exactly where a permanently
 *  fixed corner button would, so appearing only after a small scroll avoids
 *  ever covering that content on first paint. Pages too short to scroll
 *  that far (About, FAQ, etc. on a tall viewport) show the button right
 *  away instead, so it's never simply missing. */
export default function WhatsAppFloat() {
  const pathname = usePathname();
  const slug = pathname?.startsWith('/product/') ? pathname.split('/')[2] : undefined;
  const product = slug ? getProduct(slug) : undefined;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const threshold = maxScroll < 150 ? 0 : 150;
      setVisible(window.scrollY > threshold);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          href={whatsAppLink(product?.name)}
          target="_blank"
          rel="noopener"
          aria-label="Enquire on WhatsApp"
          className="fixed bottom-4 right-4 z-[90] flex h-14 w-14 items-center justify-center gap-2.5 rounded-full bg-whatsapp text-sm font-semibold text-white shadow-[0_10px_30px_rgba(18,128,64,0.4)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03] sm:h-auto sm:w-auto sm:justify-start sm:py-3.5 sm:pl-3.5 sm:pr-5 md:bottom-8 md:right-8"
        >
          <span className="absolute inset-0 -z-10 animate-ping-slow rounded-full border-2 border-whatsapp" />
          <IconWhatsApp className="h-6 w-6 shrink-0" />
          <span className="hidden sm:inline">Enquire Now</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
