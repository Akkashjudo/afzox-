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
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <IconEmpty className="h-14 w-14 text-outline-variant" />
      <span className="mt-6 font-mono text-sm font-bold tracking-widest text-primary">ERROR</span>
      <h1 className="mt-2 text-headline-lg">Something went wrong.</h1>
      <p className="mt-3 max-w-md text-body-md text-on-surface-variant">
        That was unexpected on our end. Try again, or head back to the catalogue — your enquiry
        list is safe either way.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={reset} className="btn btn-primary">Try Again</button>
        <Link href="/" className="btn btn-secondary">Back to Home</Link>
      </div>
    </div>
  );
}
