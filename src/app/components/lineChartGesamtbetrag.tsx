import { BarChart, Bar, ResponsiveContainer } from "recharts";

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
        <Bar dataKey="uv" stackId="a" fill={"hsl(35, 100%, 50%)"} barSize={8} />
        <Bar dataKey="pv" stackId="a" fill={"hsl(70, 70%, 50%)"} barSize={8} />
      </BarChart>
    </ResponsiveContainer>
  );
}
