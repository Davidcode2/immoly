import { useEffect, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

type PropTypes = {
  data: { name: string; value: number }[];
  activeIndex: number | null;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
};

export default function PieChartNebenkosten({ data, activeIndex, handleMouseEnter, handleMouseLeave }: PropTypes) {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement;
    const styles = getComputedStyle(root);
    const chartColors = [
      styles.getPropertyValue('--dark-accent'),
      styles.getPropertyValue('--neutral-accent'),
      styles.getPropertyValue('--accent'),
      styles.getPropertyValue('--light-accent'),
    ];
    setColors(chartColors);
  }, []);

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
            fill={colors[index % colors.length]}
            stroke={activeIndex === index ? colors[index % colors.length] : "none"}
            strokeWidth={activeIndex === index ? 3 : 0}
            onMouseEnter={() => handleMouseEnter(index)}
          />
        ))}
      </Pie>
    </PieChart>
  );
}
