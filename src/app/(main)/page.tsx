export const dynamic = "force-dynamic";

import { Suspense } from "react";
import StoredCalculations from "@/components/savedScenarios/storedCalculations";
import ResultDisplay from "@/resultDisplay";
import Loading from "@/app/loading";

export default async function GraphPage() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    console.warn("Skipping static generation for GraphPage");
    return <div>Skipped at build time</div>;
  }
  return (
    <div className="">
        <div className="flex flex-col md:gap-6">
          <Suspense fallback={<Loading />}>
            <ResultDisplay />
          </Suspense>
          <StoredCalculations />
        </div>
    </div>
  );
}
