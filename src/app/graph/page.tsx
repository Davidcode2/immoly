import { connect, disconnect } from '../lib/db';

interface CalculationResult {
  id: number;
  credit_sum: number;
  interest_rate: number;
  monthly_rate: number;
  capital: number;
  rent: number;
  yearly_rate: number;
  created_at: string;
}

async function getCalculation(calculationId: number): Promise<CalculationResult | null> {
  const client = await connect();
  try {
    const query = `
      SELECT id, credit_sum, interest_rate, monthly_rate, capital, rent, yearly_rate, created_at
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
    return <div>No calculation ID provided.</div>;
  }

  const calculationData = await getCalculation(parseInt(calculationId, 10));

  if (!calculationData) {
    return <div>Calculation not found.</div>;
  }

  return (
    <div>
      <h1>Calculation Result</h1>
      <p>Credit Sum: {calculationData.credit_sum}</p>
      <p>Interest Rate: {calculationData.interest_rate}%</p>
      <p>Monthly Rate: {calculationData.monthly_rate}</p>
      <p>Capital: {calculationData.capital}</p>
      <p>Rent: {calculationData.rent}</p>
      <p>Yearly Interest: {calculationData.yearly_rate}</p>
      <p>Calculated At: {new Date(calculationData.created_at).toLocaleString()}</p>
    </div>
  );
}
