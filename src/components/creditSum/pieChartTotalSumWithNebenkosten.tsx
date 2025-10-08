import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

type PropTypes = {
  kreditSumme: number;
  downPayment: number;
  kaufSumme: number;
};

export default function PieChartGesamtBetrag({
  kreditSumme,
  downPayment,
  kaufSumme,
}: PropTypes) {
  const calcPieData = (
    kreditSumme: number,
    nebenkosten: number,
    kaufSumme: number,
  ) => {
    const percentageNebenkosten = (kreditSumme / 100) * nebenkosten;
    const percentageKaufSumme = (kreditSumme / 100) * kaufSumme;
    return [
      { name: "Kaufpreis", value: percentageKaufSumme },
      { name: "Nebenkosten", value: percentageNebenkosten },
    ];
  };

  const colors = ["var(--accent)", "var(--dark-accent)"];
  const data = calcPieData(kreditSumme, downPayment, kaufSumme);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="100%"
          paddingAngle={8}
          stroke="none"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
