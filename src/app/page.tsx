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
    <div className="dark:bg-[url(/images/black_rainbow_low_saturation.jpg)] dark:bg-cover dark:bg-bottom">
      <div className="mx-auto min-h-screen max-w-[2000px] pb-20 font-[family-name:var(--font-geist-sans)] sm:p-10">
        <div className="flex flex-col gap-4">
          <Suspense fallback={<Loading />}>
            <ResultDisplay />
          </Suspense>
          <Graphs />
        </div>
      </div>
    </div>
  );
}
