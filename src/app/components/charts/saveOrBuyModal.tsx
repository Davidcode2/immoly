import CashRoiModel from "app/lib/models/cashRoiModel";
import OptionalParameters from "../baseDataForm/optionalParameters";
import DevelopmentChart from "./developmentChart";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";

type PropTypes = {
  setInput: (data: CashRoiModel) => void;
  input: CashRoiModel;
  table: ArmotizationEntry[];
};
export default function SaveOrBuyModal({ table, input, setInput }: PropTypes) {
  const handleChange = (name: string, value: number) => {
    if (name === "cashRoi") {
      setInput({ ...input, ["cash_roi"]: value });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  return (
    <div className="rounded-lg border bg-[var(--background)]/80 shadow-xl">
      <h4 className="p-10 text-3xl border-b">Kaufen oder Sparen?</h4>
      <div className="flex flex-col gap-x-30 gap-y-10 p-10 lg:flex-row">
        <OptionalParameters
          cashRoi={input.cash_roi!}
          handleInputChange={handleChange}
          rent={input.rent!}
        />
        <div className="min-h-[280px] w-[400px]">
          <DevelopmentChart
            tilgungsTabelle={table}
            rent={input.rent}
            interest={input.cash_roi || 0}
            timeoutAmount={80}
          />
        </div>
      </div>
      <div className="px-10 py-4 text-[var(--foreground)]/70 rounded-b-xl text-sm border-t">
        Inflation wird nicht berücksichtigt
      </div>
    </div>
  );
}
