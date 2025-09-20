export const dynamic = "force-dynamic";

import StoredCalculations from "app/storedCalculations";
import ResultDisplay from "app/resultDisplay";
import { Suspense } from "react";
import Loading from "app/loading";
import BankLinkList from "./components/bankLinkList";
import Footer from "./components/footer/footer";
import Header from "./components/header";

export default async function GraphPage() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    console.warn("Skipping static generation for GraphPage");
    return <div>Skipped at build time</div>;
  }
  return (
    <div className="">
      <div className="mx-auto min-h-screen max-w-[2000px] pb-20 sm:pb-10">
        <Header />
        <div className="flex flex-col md:gap-6">
          <Suspense fallback={<Loading />}>
            <ResultDisplay />
          </Suspense>
          <StoredCalculations />
          <BankLinkList />
        </div>
      </div>
      <Footer />
    </div>
  );
}
