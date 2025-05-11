import Link from 'next/link';
import { connect, disconnect } from '../lib/db';
import CalculationResult from 'app/lib/models/CalculationResult';
import Graphs from 'app/graphs';
import ResultDisplay from 'app/resultDisplay';

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
  console.log('Calculation ID:', calculationId);

  return (
    <div className="grid gap-4 p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <code><Link href="/">back</Link></code>
      <div className="grid items-center gap-16">
        <ResultDisplay />
        <Graphs />
      </div>
    </div>
  );
}
