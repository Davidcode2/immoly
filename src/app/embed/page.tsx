export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ResultDisplay from "@/resultDisplay";
import Loading from "@/app/loading";

export default async function EmbedPage() {

  return (
    <div className="">
        <div className="flex flex-col md:gap-6">
          <Suspense fallback={<Loading />}>
            <ResultDisplay />
          </Suspense>
        </div>
    </div>
  );
}
