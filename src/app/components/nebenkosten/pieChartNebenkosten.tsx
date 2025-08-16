import { Cell, Pie, PieChart } from "recharts";

const COLORS = [
  "hsl(194, 33%, 22%)",
  "hsl(194, 33%, 18%)",
  "hsl(195, 37%, 40%)",
  "hsl(172, 25%, 55%)",
];

type PropTypes = {
  data: { name: string; value: number }[];
  activeIndex: number | null;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
};

export default function PieChartNebenkosten({ data, activeIndex, handleMouseEnter, handleMouseLeave }: PropTypes) {

  return (
    <PieChart width={180} height={window.innerWidth < 768 ? 90 : 130}>
      <Pie
        data={data}
        cx={85}
        cy={window.innerWidth < 768 ? 85 : 60}
        innerRadius={window.innerWidth < 768 ? 40 : 70}
        outerRadius={window.innerWidth < 768 ? 80 : 90}
        paddingAngle={3}
        dataKey="value"
        startAngle={window.innerWidth < 768 ? 180 : 0}
        endAngle={window.innerWidth < 768 ? 0 : 360}
        onMouseLeave={handleMouseLeave}
      >
        {data.map((entry, index) => (
          <Cell
            key={entry.name}
            fill={COLORS[index % COLORS.length]}
            stroke={
              activeIndex === index ? COLORS[index % COLORS.length] : "none"
            }
            strokeWidth={activeIndex === index ? 3 : 0}
            onMouseEnter={() => handleMouseEnter(index)}
          />
        ))}
      </Pie>
    </PieChart>
  );
}
