import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type PropTypes = {
  data: { name: string; value: number }[];
  activeIndex: number | null;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
};

export default function PieChartNebenkosten({
  data,
  activeIndex,
  handleMouseEnter,
  handleMouseLeave,
}: PropTypes) {
  const [colors, setColors] = useState<string[]>([]);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    const updateColors = () => {
      const styles = getComputedStyle(root);
      const chartColors = [
        styles.getPropertyValue("--dark-accent"),
        styles.getPropertyValue("--neutral-accent"),
        styles.getPropertyValue("--accent"),
        styles.getPropertyValue("--light-accent"),
      ].map((c) => c.trim());
      setColors(chartColors);
    };

    // Defer until after class change has applied
    const id = setTimeout(updateColors, 0);
    return () => clearTimeout(id);
  }, [resolvedTheme]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cy={window.innerWidth < 768 ? "100%" : "50%"}
          innerRadius={window.innerWidth < 768 ? "50%" : "70%"}
          outerRadius={"100%"}
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
              stroke={
                activeIndex === index ? colors[index % colors.length] : "none"
              }
              strokeWidth={activeIndex === index ? 3 : 0}
              onMouseEnter={() => handleMouseEnter(index)}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
