'use server';
import { redirect } from 'next/navigation';
import { connect, disconnect } from './lib/db'; // Adjust the import path as needed

export async function calc(formData: FormData) {
  const principal = Number(formData.get('creditSum'));
  const interest = Number(formData.get('interestRate'));
  const monthlyRate = Number(formData.get('monthlyRate'));
  const capital = Number(formData.get('capital'));
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
    console.log('Inserted calculation with ID:', calculationId);
    redirect(`/graph?calculationId=${calculationId}`);
  } finally {
    await disconnect();
  }
}

function calcYearlyRate(creditSum: number, interest: number) {
  return (creditSum * interest) / 100;
}

