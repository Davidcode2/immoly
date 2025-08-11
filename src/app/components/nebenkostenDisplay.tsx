import CashRoiModel from "app/lib/models/cashRoiModel";
import NebenkostenCalculator from "app/services/nebenkostenCalculationService";
import { useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

const COLORS = [
  "hsl(194, 33%, 22%)",
  "hsl(194, 33%, 18%)",
  "hsl(195, 37%, 40%)",
  "hsl(172, 25%, 55%)",
];

type PropTypes = {
  calculationData: CashRoiModel | null;
};

export default function NebenkostenDisplay({ calculationData }: PropTypes) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const nebenkostenCalculator = new NebenkostenCalculator(
    calculationData!.principal,
  );

  const handleMouseEnter = (index: number) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  const calcGraphData = () => {
    const graphData = [
      { name: "Notarkosten", value: nebenkostenCalculator.calcNotarkosten() },
      {
        name: "Grundbuchkosten",
        value: nebenkostenCalculator.calcGrundbuchkosten(),
      },
      {
        name: "Grunderwerbsteuer",
        value: nebenkostenCalculator.calcGrunderwerbsteuer("Baden-Württemberg"),
      },
      {
        name: "Maklergebühr",
        value: nebenkostenCalculator.calcMaklergebuehr(),
      },
    ];
    return graphData;
  };

  const data = calcGraphData();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 rounded-lg px-6 pt-4 md:py-4 text-xs shadow backdrop-blur-2xl sm:col-span-2 md:justify-start md:text-base">
      <PieChart width={130} height={window.innerWidth < 768 ? 70 : 130}>
        <Pie
          data={data}
          cx={60}
          cy={60}
          innerRadius={40}
          outerRadius={60}
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

      <div className="h-20 md:h-fit overflow-y-scroll flex-col gap-2 md:flex order-first md:order-2">
        {data.map((entry, index) => (
          <div
            key={entry.name}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer transition-opacity ${
              activeIndex === index ? "font-semibold opacity-100" : "opacity-90"
            }`}
          >
            <span
              className="mr-2 inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {entry.name}: €{entry.value.toLocaleString("de")}
          </div>
        ))}
      </div>
    </div>
  );
}
