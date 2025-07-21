export const dynamic = "force-dynamic";

import Graphs from "app/graphs";
import ResultDisplay from "app/resultDisplay";
import { Suspense } from "react";
import Loading from "app/loading";

export default async function GraphPage() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    console.warn("Skipping static generation for GraphPage");
    return <div>Skipped at build time</div>;
  }
  return (
    <div className="bg-[url(/images/grainy_gradient_dark_wide.jpg)] bg-cover saturate-90 scheme-dark grid gap-4 p-3 lg:p-8 pb-20 sm:p-10 font-[family-name:var(--font-geist-sans)] max-w-[2000px] mx-auto">
      <div className="grid items-center gap-8">
        <Suspense fallback={<Loading />}>
          <ResultDisplay />
        </Suspense>
        <Graphs />
      </div>
    </div>
  );
}
