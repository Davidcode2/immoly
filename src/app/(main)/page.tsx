export const dynamic = "force-dynamic";

import { Suspense } from "react";
import StoredCalculations from "@/components/savedScenarios/storedCalculations";
import ResultDisplay from "@/resultDisplay";
import Loading from "@/app/loading";
import SloganHero from "@/components/hero/sloganHero";

export default async function GraphPage() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    console.warn("Skipping static generation for GraphPage");
    return <div>Skipped at build time</div>;
  }
  return (
    <div className="">
      <div className="flex flex-col md:gap-6">
        <Suspense fallback={<Loading />}>
          <div className="px-3 pt-2 sm:px-10 md:pb-10">
            <div className="rounded-lg backdrop-blur-2xl md:mt-12 md:hidden md:p-8">
              <SloganHero />
            </div>
            <ResultDisplay />
          </div>
        </Suspense>
        <StoredCalculations />
      </div>
    </div>
  );
}
