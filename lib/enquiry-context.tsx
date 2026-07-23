'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct } from './catalogue';

interface EnquiryLine {
  slug: string;
  qty: number;
}

interface EnquiryContextValue {
  lines: EnquiryLine[];
  count: number;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  has: (slug: string) => boolean;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);
const STORAGE_KEY = 'afzox-enquiry-v1';

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<EnquiryLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* corrupted or blocked storage — start empty, non-fatal */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback((slug: string) => {
    if (!getProduct(slug)) return;
    setLines((prev) => {
      if (prev.some((l) => l.slug === slug)) return prev;
      return [...prev, { slug, qty: 1 }];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, qty) } : l)));
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const has = useCallback((slug: string) => lines.some((l) => l.slug === slug), [lines]);

  const value = useMemo<EnquiryContextValue>(
    () => ({ lines, count: lines.length, add, remove, setQty, clear, has }),
    [lines, add, remove, setQty, clear, has]
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider');
  return ctx;
}
