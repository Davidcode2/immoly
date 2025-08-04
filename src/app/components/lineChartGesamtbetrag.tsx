import { BarChart, Bar } from "recharts";

type PropTypes = {
  kreditSumme: number,
  downPayment: number
  nebenkosten: number,
  kaufSumme: number,
}

export default function LineChartGesamtBetrag({ kreditSumme, downPayment, nebenkosten, kaufSumme }: PropTypes) {

  const calcBarData = (kreditSumme: number, nebenkosten: number, downPayment: number, kaufSumme: number) => {
    const percentageNebenkosten = (kreditSumme / 100) * nebenkosten; 
    const percentageDownPayment = (kreditSumme / 100) * downPayment;
    const percentageKaufSumme = (kreditSumme / 100) * kaufSumme;
    return [
      { name: "Kaufpreis", pv: percentageKaufSumme, uv: percentageNebenkosten, xv: percentageDownPayment },
    ];
  }

  const data = calcBarData(kreditSumme, nebenkosten, downPayment, kaufSumme);

  return (
      <BarChart
        width={12}
        height={160}
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <Bar dataKey="pv" stackId="a" fill="#8884d8" barSize={8} />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" barSize={8} />
        <Bar dataKey="xv" stackId="a" fill="hsl(70, 100%, 50%)" barSize={8} />
      </BarChart>
  );
}
