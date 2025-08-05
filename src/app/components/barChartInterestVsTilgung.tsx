import { BarChart, Bar, Cell, XAxis } from "recharts";

type PropTypes = {
  sumZinsen: number;
  kreditSumme: number;
};

export default function BarChartInterestVsTilgung({
  sumZinsen,
  kreditSumme,
}: PropTypes) {
  const calcBarData = (sumZinsen: number, kreditSumme: number) => {
    return [
      { name: "Kaufpreis", value: kreditSumme, interestSum: sumZinsen },
      { name: "Kaufpreis", value: kreditSumme, interestSum: sumZinsen },
    ];
  };

  const data = calcBarData(sumZinsen, kreditSumme);

  return (
    <BarChart
      className=""
      width={200}
      height={10}
      data={data}
      layout="vertical"
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <XAxis domain={[0, 'dataMax']} type="number" hide />
      <Bar dataKey="value" stackId="a">
        <Cell height={15} key={`cell-0`} fill={"hsl(120, 50%, 50%"} />
      </Bar>
      <Bar dataKey="interestSum" stackId="a">
        <Cell height={15} key={`cell-1`} fill={"hsl(35, 80%, 60%"} />
      </Bar>
    </BarChart>
  );
}
