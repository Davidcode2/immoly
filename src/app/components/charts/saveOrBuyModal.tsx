import CashRoiModel from "app/lib/models/cashRoiModel";
import OptionalParameters from "../baseDataForm/optionalParameters";
import DevelopmentChart from "./developmentChart";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";

type PropTypes = {
  setInput: (data: CashRoiModel) => void;
  input: CashRoiModel;
  table: ArmotizationEntry[];
}
export default function SaveOrBuyModal({ table, input, setInput }: PropTypes) {

  const handleChange = (name: string, value: number) => {
    if (name === "cashRoi") {
      setInput({ ...input, ["cash_roi"]: value });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  return (
    <div className="rounded-lg bg-[var(--primary)]/60 p-10 shadow-xl">
      <OptionalParameters
        cashRoi={input.cash_roi!}
        handleInputChange={handleChange}
        rent={input.rent!}
      />
      <div className="w-[400px]">
        <DevelopmentChart
          tilgungsTabelle={table}
          rent={input.rent}
          interest={input.cash_roi || 0}
          timeoutAmount={80}
        />
      </div>
    </div>
  );
}
