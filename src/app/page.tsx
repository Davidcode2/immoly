export const dynamic = "force-dynamic";

import StoredCalculations from "app/storedCalculations";
import ResultDisplay from "app/resultDisplay";
import { Suspense } from "react";
import Loading from "app/loading";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";

export default async function GraphPage() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    console.warn("Skipping static generation for GraphPage");
    return <div>Skipped at build time</div>;
  }
  return (
    <div className="">
      <div className="mx-auto min-h-screen max-w-[2000px]">
        <Header />
        <div className="flex flex-col md:gap-6">
          <Suspense fallback={<Loading />}>
            <ResultDisplay />
          </Suspense>
          <StoredCalculations />
        </div>
        <Footer />
      </div>
    </div>
  );
}
