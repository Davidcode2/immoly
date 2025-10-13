export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ResultDisplay from "@/resultDisplay";
import Loading from "@/app/loading";

export default async function EmbedPage() {
  return (
    <div className="">
      <div className="flex flex-col md:gap-6">
        <Suspense fallback={<Loading />}>
          <div className="p-3 md:pt-8">
            <ResultDisplay />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
