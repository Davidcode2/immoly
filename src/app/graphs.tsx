import { connect, disconnect } from './lib/db';
import CalculationResult from './lib/models/CalculationResult';
import SingleGraph from './singleGraph';

async function getCalculations() {
  const client = await connect();
  try {
    const query = `
      SELECT id, principal, interest_rate, monthly_rate, down_payment, rent, annual_percentage_rate, created_at
      FROM calculations;
    `;
    const result = await client.query(query);
    return result.rows.length > 0 ? result.rows as CalculationResult[] : null;
  } catch (error) {
    console.error('Error fetching calculations:', error);
    return null;
  } finally {
    await disconnect();
  }
}

export default async function Graphs() {
  const calculationData = await getCalculations();
  console.log(calculationData);

  return (
    <div className="grid grid-cols-4 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {
        calculationData && calculationData.map(calcResult => <div key={calcResult.id} className="rounded-md border border-purple-700 p-4">
          <SingleGraph calculation={calcResult} />
        </div>)
      }
    </div>

  )
}
