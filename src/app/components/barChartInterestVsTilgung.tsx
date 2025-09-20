import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

type PropTypes = {
  sumZinsen: number;
  kreditSumme: number;
  show?: boolean;
};

export default function BarChartInterestVsTilgung({
  sumZinsen,
  kreditSumme,
  show = true,
}: PropTypes) {
  const calcBarData = (sumZinsen: number, kreditSumme: number) => {
    return [
      { name: "Summen", uv: kreditSumme, pv: sumZinsen },
      { name: "somethign", uv: 8, pv: 90 },
    ];
  };

  const mydata = calcBarData(sumZinsen, kreditSumme);

  if (!show || sumZinsen === 0 || kreditSumme === 0) {
    return <div/>;
  }

  return (
    <ResponsiveContainer>
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
          fill={"var(--light-accent)"}
          barSize={10}
        />
        <Bar
          dataKey="pv"
          stackId="c"
          fill={"var(--dark-accent)"}
          radius={[0, 10, 10, 0]}
          barSize={10}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
