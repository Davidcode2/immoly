import CashRoiModel from "app/lib/models/cashRoiModel";
import { Cell, Pie, PieChart } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

type PropTypes = {
  calculationData: CashRoiModel;
}

export default function NebenkostenDisplay({ calculationData }: PropTypes) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  const calcNotarkosten = () => {
    return calculationData.principal * 0.015;
  }

  const calcGrundbuchkosten = () => {
    return calculationData.principal * 0.005;
  }

  const calcMaklergebuehr = () => {
    return calculationData.principal * 0.0357;
  }

  const calcGrunderwerbsteuer = (bundesland: string) => {
    switch (bundesland) {
      case "Baden-Württemberg":
        return calculationData.principal * 0.05;
      case "Bayern":
        return calculationData.principal * 0.03;
      case "Berlin":
        return calculationData.principal * 0.06;
      case "Brandenburg":
        return calculationData.principal * 0.06;
      case "Bremen":
        return calculationData.principal * 0.05;
      case "Hamburg":
        return calculationData.principal * 0.04;
      case "Hessen":
        return calculationData.principal * 0.06;
      case "Mecklenburg-Vorpommern":
        return calculationData.principal * 0.06;
      case "Niedersachsen":
        return calculationData.principal * 0.05;
      case "Nordrhein-Westfalen":
        return calculationData.principal * 0.06;
      case "Rheinland-Pfalz":
        return calculationData.principal * 0.05;
      case "Saarland":
        return calculationData.principal * 0.06;
      case "Sachsen":
        return calculationData.principal * 0.03;
      case "Sachsen-Anhalt":
        return calculationData.principal * 0.02;
      case "Schleswig-Holstein":
        return calculationData.principal * 0.05;
      case "Thüringen":
        return calculationData.principal * 0.03;
      default:
        return calculationData.principal * 0.04;
    }
  }

  const graphData = () => {
    const data = [
      { name: "Notarkosten", value: calcNotarkosten() },
      { name: "Grundbuchkosten", value: calcGrundbuchkosten() },
      { name: "Grunderwerbsteuer", value: calcGrunderwerbsteuer("Baden-Württemberg") },
      { name: "Maklergebühr", value: calcMaklergebuehr() },
    ];
    return data;
  }
  return (
    <>
      <div className="flex md:flex-col items-center text-xs md:items-start h-24 md:max-h-none md:w-fit md:max-w-58 md:h-48 gap-x-4 gap-y-2 rounded-lg p-3 md:p-8 shadow backdrop-blur-2xl">
        <PieChart width={200} height={400}>
          <Pie
            data={graphData()}
            cx={60}
            cy={60}
            innerRadius={40}
            outerRadius={50}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, value }) => `${name}: €${value.toLocaleString()}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </>
  );
}
