import SingleGraph from './singleGraph';
import getCalculations from './lib/getCalculations';

export default async function Graphs() {
  const calculationData = await getCalculations();

  return (
    <div className="flex items-stretch gap-16 max-w-screen overflow-auto">
      {
        calculationData && calculationData.map(calcResult =>
          <SingleGraph key={calcResult.id} calculation={calcResult} />
        )
      }
    </div>

  )
}
