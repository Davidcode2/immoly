export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Loading from "@/app/loading";
import Embed from "@/components/embed";

export default async function EmbedPage() {

  return (
    <div className="">
      <div className="flex flex-col md:gap-6">
        <Suspense fallback={<Loading />}>
          <Embed/>
        </Suspense>
      </div>
    </div>
  );
}
