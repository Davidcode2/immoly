import PlotlyChart from "./chart";
import ArmotizationEntry from "@/lib/models/ArmotizationEntry";
import CashRoiModel from "@/lib/models/cashRoiModel";
import SaveOrBuyContainer from "./saveOrBuyContainer";
import useScreenWidth from "@/hooks/useScreenwidth";

type PropTypes = {
  table: ArmotizationEntry[];
  input: CashRoiModel | null;
  setInput: (arg1: CashRoiModel) => void;
};

export default function ChartsContainer({ input, setInput, table }: PropTypes) {
  const isMobileScreen = useScreenWidth();

  return (
    <div className="2xl:col-start-2">
      {input && (
        <div className="grid gap-y-20 md:gap-4">
          <div className="min-h-[450px] px-4 justify-around rounded-lg md:shadow backdrop-blur-lg md:min-h-[300px]">
            <PlotlyChart data={table} rent={input.rent} />
          </div>
          { !isMobileScreen && 
          <div className="px-4 min-h-[200px] justify-around rounded-lg backdrop-blur-lg md:block md:min-h-[300px] md:shadow">
            <SaveOrBuyContainer table={table} setInput={setInput} input={input} />
          </div>
          }
        </div>
      )}
    </div>
  );
}
