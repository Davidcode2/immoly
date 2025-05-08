'use server';
import { redirect } from 'next/navigation';
import { connect, disconnect } from './lib/db'; // Adjust the import path as needed

type Scenario = {
  creditSum: number;
  interestRate: number;
  monthlyRate: number;
  capital: number;
  rent: number;
  months: number;
};

export async function calc(formData: FormData) {
  const creditSum = Number(formData.get('creditSum'));
  const interest = Number(formData.get('interestRate'));
  const monthlyRate = Number(formData.get('monthlyRate'));
  const capital = Number(formData.get('capital'));
  const rent = Number(formData.get('rent'));

  const rateFixation = 10;

  const yearlyRate = (creditSum * interest) / 100;

  const client = await connect();
  try {
    const query = `
      INSERT INTO calculations (credit_sum, interest_rate, monthly_rate, capital, rent, yearly_rate)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const values = [
      creditSum,
      interest,
      monthlyRate,
      capital,
      rent,
      yearlyRate,
    ];
    const result = await client.query(query, values);

    const calculationId = result.rows[0].id;
    console.log('Inserted calculation with ID:', calculationId);
    redirect(`/graph?calculationId=${calculationId}`);
  } finally {
    await disconnect();
  }
}
