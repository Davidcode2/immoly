import PlotlyChart from "app/chart";
import DevelopmentChart from "app/developmentChart";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import CashRoiModel from "app/lib/models/cashRoiModel";

type PropTypes = {
  table: ArmotizationEntry[];
  input: CashRoiModel | null;
}

export default function ChartsContainer({ input, table }: PropTypes) {
  return (
    <div className="xl:col-start-2">
      {input && (
        <div className="grid gap-y-20 md:gap-4">
          <div className="grid min-h-[300px] justify-around rounded-lg border border-slate-600 bg-neutral-950/10 shadow-lg backdrop-blur-lg">
            <PlotlyChart data={table} rent={input.rent} />
          </div>
          <div className="grid min-h-[300px] justify-around rounded-lg border border-slate-600 bg-neutral-950/10 shadow-lg backdrop-blur-lg">
            <DevelopmentChart
              data={table}
              rent={input.rent}
              interest={input.cash_roi || 0}
            />
          </div>
        </div>
      )}
    </div>
  );
}
