import { BarChart, Bar, ResponsiveContainer, YAxis } from "recharts";

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
  const calcBarData = (
    kreditSumme: number,
    nebenkosten: number,
    kaufSumme: number,
  ) => {
    const percentageNebenkosten = (kreditSumme / 100) * nebenkosten;
    const percentageKaufSumme = (kreditSumme / 100) * kaufSumme;
    return [
      { name: "Kaufpreis", pv: percentageKaufSumme, uv: percentageNebenkosten },
    ];
  };

  const data = calcBarData(kreditSumme, downPayment, kaufSumme);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={12}
        height={100}
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <YAxis domain={[0, "dataMax"]} hide />
        <Bar dataKey="uv" stackId="a" fill={"hsl(194, 33%, 18%)"} barSize={10} radius={[0, 0, 10, 10]} />
        <Bar dataKey="pv" stackId="a" fill={"hsl(195, 37%, 40%)"} barSize={10} radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
