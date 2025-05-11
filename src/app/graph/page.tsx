import Link from 'next/link';
import { connect, disconnect } from '../lib/db';
import CalculationResult from 'app/lib/models/CalculationResult';
import Graphs from 'app/graphs';

async function getCalculation(calculationId: number): Promise<CalculationResult | null> {
  const client = await connect();
  try {
    const query = `
      SELECT id, principal, interest_rate, monthly_rate, down_payment, rent, annual_percentage_rate, created_at
      FROM calculations
      WHERE id = $1;
    `;
    const values = [calculationId];
    const result = await client.query(query, values);
    return result.rows.length > 0 ? result.rows[0] as CalculationResult : null;
  } catch (error) {
    console.error('Error fetching calculation:', error);
    return null;
  } finally {
    await disconnect();
  }
}

export default async function GraphPage({ searchParams }: { searchParams: { calculationId?: string } }) {
  const { calculationId } = searchParams;

  if (!calculationId) {
    return (
      <div>
        <div>No calculation ID provided.</div>
        <Graphs/>
      </div>
    );
  }

  const calculationData: CalculationResult | null = await getCalculation(parseInt(calculationId, 10));

  if (!calculationData) {
    return <div>Calculation not found.</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-2">
        <h1>Calculation Result</h1>
        <p>Credit Sum: {calculationData.principal}</p>
        <p>Interest Rate: {calculationData.interest_rate}%</p>
        <p>Monthly Rate: {calculationData.monthly_rate}</p>
        <p>Capital: {calculationData.down_payment}</p>
        <p>Rent: {calculationData.rent}</p>
        <p>Yearly Interest: {calculationData.annual_percentage_rate}</p>
        <p>Calculated At: {new Date(calculationData.created_at).toLocaleString()}</p>
      </div>
      <Link href="/">back</Link>
    </div>
  );
}
