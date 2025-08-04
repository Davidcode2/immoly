import { BarChart, Bar } from "recharts";

type PropTypes = {
  sumZinsen: number;
  kreditSumme: number;
};

export default function BarChartInterestVsTilgung({
  sumZinsen,
  kreditSumme,
}: PropTypes) {
  const calcBarData = (sumZinsen: number, kreditSumme: number) => {
    return [{ name: "Kaufpreis", pv: kreditSumme, uv: sumZinsen }];
  };

  const data = calcBarData(sumZinsen, kreditSumme);

  return (
    <div className="rotate-90">
      <BarChart
        width={12}
        height={205}
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <Bar dataKey="pv" stackId="a" fill="#8884d8" barSize={8} />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" barSize={8} />
      </BarChart>
    </div>
  );
}
