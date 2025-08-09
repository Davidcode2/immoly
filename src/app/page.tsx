export const dynamic = "force-dynamic";

import StoredCalculations from "app/storedCalculations";
import ResultDisplay from "app/resultDisplay";
import { Suspense } from "react";
import Loading from "app/loading";
import Image from "next/image";

export default async function GraphPage() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    console.warn("Skipping static generation for GraphPage");
    return <div>Skipped at build time</div>;
  }
  return (
    <div className="font-[family-name:var(--font-geist-sans)] dark:bg-[url(/images/black_rainbow_low_saturation.jpg)] dark:bg-cover dark:bg-bottom">
      <div className="mx-auto min-h-screen max-w-[2000px] pb-20 sm:p-10">
        <div className="flex flex-col gap-12 md:gap-6">
          <Suspense fallback={<Loading />}>
            <ResultDisplay />
          </Suspense>
          <StoredCalculations />
        </div>
      </div>
      <div className="bg-[var(--secondary)]">
        <div className="flex text-[var(--dark-accent)]/50 justify-center gap-x-2 p-8">
          Gebaut auf der{" "}
          <Image
            src="/images/icons/icons8-couch-85.png"
            width="25"
            height="25"
            alt="Sofa"
          />
        </div>
      </div>
    </div>
  );
}
