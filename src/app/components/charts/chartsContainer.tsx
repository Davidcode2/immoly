import PlotlyChart from "./chart";
import DevelopmentChart from "./developmentChart";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import CashRoiModel from "app/lib/models/cashRoiModel";

type PropTypes = {
  table: ArmotizationEntry[];
  input: CashRoiModel | null;
};

export default function ChartsContainer({ input, table }: PropTypes) {
  return (
    <div className="2xl:col-start-2">
      {input && (
        <div className="grid gap-y-20 md:gap-4">
          <div className="grid min-h-[200px] md:justify-around rounded-lg md:shadow backdrop-blur-lg md:min-h-[300px]">
            <PlotlyChart data={table} rent={input.rent} />
          </div>
          <div className="hidden md:grid min-h-[200px] justify-around rounded-lg md:shadow backdrop-blur-lg md:min-h-[300px]">
            <DevelopmentChart
              tilgungsTabelle={table}
              rent={input.rent}
              interest={input.cash_roi || 0}
            />
          </div>
        </div>
      )}
    </div>
  );
}
