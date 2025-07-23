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
    <div className="bg-[url(/images/grainy_gradient_dark_wide_smooth_enlarged.jpg)] bg-cover saturate-90">
      <div className="mx-auto grid min-h-screen max-w-[2000px] gap-4 pb-20 font-[family-name:var(--font-geist-sans)] scheme-dark sm:p-10 lg:p-8">
        <div className="my-auto flex flex-col gap-4">
          <Suspense fallback={<Loading />}>
            <ResultDisplay />
          </Suspense>
          <Graphs />
        </div>
      </div>
    </div>
  );
}
