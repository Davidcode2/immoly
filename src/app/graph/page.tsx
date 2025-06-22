import Link from 'next/link';
import Graphs from 'app/graphs';
import ResultDisplay from 'app/resultDisplay';
import { Suspense } from 'react';

export default async function GraphPage() {
  return (
    <div className="grid gap-4 p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button className="rounded-full bg-slate-200 px-2 w-fit text-slate-800"><code><Link href="/">back</Link></code></button>
      <div className="grid items-center gap-16">
        <Suspense fallback={<Loading/>>
          <ResultDisplay />
        </Suspense>
        <Graphs />
      </div>
    </div>
  );
}
