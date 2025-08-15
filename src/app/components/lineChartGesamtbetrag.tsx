import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

type PropTypes = {
  kreditSumme: number;
  downPayment: number;
  kaufSumme: number;
};

export default function LineChartGesamtBetrag({
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

  const data = calcPieData(kreditSumme, downPayment, kaufSumme);
  const COLORS = ["hsl(195, 37%, 40%)", "hsl(194, 33%, 18%)"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="100%"
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
