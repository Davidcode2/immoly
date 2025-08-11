import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

type PropTypes = {
  sumZinsen: number;
  kreditSumme: number;
  show: boolean;
};

export default function BarChartInterestVsTilgung({
  sumZinsen,
  kreditSumme,
  show,
}: PropTypes) {
  const calcBarData = (sumZinsen: number, kreditSumme: number) => {
    return [
      { name: "Summen", uv: kreditSumme, pv: sumZinsen },
      { name: "somethign", uv: 2, pv: 90 },
    ];
  };

  const mydata = calcBarData(sumZinsen, kreditSumme);

  return (
    <ResponsiveContainer className={`${show ? "block" : "hidden"}`}>
      <BarChart
        data={mydata}
        layout="vertical"
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis domain={[0, "dataMax"]} type="number" hide />
        <Bar
          dataKey="uv"
          stackId="c"
          radius={[10, 0, 0, 10]}
          fill={"hsl(172, 25%, 55%)"}
          barSize={10}
        />
        <Bar
          dataKey="pv"
          stackId="c"
          fill={"hsl(95, 32%, 82%)"}
          radius={[0, 10, 10, 0]}
          barSize={10}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
