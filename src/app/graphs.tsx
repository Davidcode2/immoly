import SingleGraph from './singleGraph';
import getCalculations from './lib/getCalculations';

export default async function Graphs() {
  const calculationData = await getCalculations();
  console.log(calculationData);

  return (
    <div className="grid grid-cols-4 items-center gap-16">
      {
        calculationData && calculationData.map(calcResult => <div key={calcResult.id} className="rounded-md border border-purple-700 p-4">
          <SingleGraph calculation={calcResult} />
        </div>)
      }
    </div>

  )
}
