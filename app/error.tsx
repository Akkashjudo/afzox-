'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { IconEmpty } from '@/components/icons';

/** Global error boundary — catches unexpected runtime errors so a visitor
 *  never sees Next's default unstyled fallback. Next.js requires this file
 *  to be a Client Component. */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="shell flex min-h-[68svh] max-w-2xl flex-col items-center justify-center py-24 text-center">
      <IconEmpty className="h-12 w-12 text-outline" />
      <span className="mt-7 text-label-md uppercase text-brand">ERROR</span>
      <h1 className="mt-4 text-headline-xl text-balance">Something went wrong.</h1>
      <p className="mt-5 max-w-prose text-body-md text-on-surface-variant">
        That was unexpected on our end. Try again, or head back to the catalogue — your enquiry
        list is safe either way.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <button onClick={reset} className="btn btn-primary">Try again</button>
        <Link href="/" className="btn btn-secondary">Back to home</Link>
      </div>
    </div>
  );
}
