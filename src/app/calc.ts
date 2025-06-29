'use server';
import { redirect } from 'next/navigation';
import { connect, disconnect } from './lib/db';

export async function calc(formData: FormData) {
  const capital = Number(formData.get('down_payment'));
  const principal = Number(formData.get('principal'));
  const interest = Number(formData.get('interest_rate'));
  const monthlyRate = Number(formData.get('monthly_rate'));
  const rent = Number(formData.get('rent'));

  const yearlyRate = calcYearlyRate(principal, interest);

  const client = await connect();
  try {
    const query = `
      INSERT INTO calculations (principal, interest_rate, monthly_rate, down_payment, rent, annual_percentage_rate)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const values = [
      principal,
      interest,
      monthlyRate,
      capital,
      rent,
      yearlyRate,
    ];
    const result = await client.query(query, values);

    const calculationId = result.rows[0].id;
    redirect(`/graph?calculationId=${calculationId}`);
  } finally {
    await disconnect();
  }
}

function calcYearlyRate(creditSum: number, interest: number) {
  return (creditSum * interest) / 100;
}
