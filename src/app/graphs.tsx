import SingleGraph from "./singleGraph";
import getCalculations from "./lib/getCalculations";

export default async function Graphs() {
  const calculationData = await getCalculations();

  return (
    <div className="flex max-w-screen items-stretch gap-16 overflow-auto px-3 pb-3">
      {calculationData &&
        calculationData.map((calcResult) => (
          <SingleGraph key={calcResult.id} calculation={calcResult} />
        ))}
    </div>
  );
}
