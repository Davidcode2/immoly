import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import CashRoiModel from "app/lib/models/cashRoiModel";
import Tilgungstabelle from "app/tilgungsTabelle";

type PropTypes = {
  calculationId: string | null;
  data: ArmotizationEntry[] | null;
  input: CashRoiModel | null;
  setData: (tilgungsTabelle: ArmotizationEntry[]) => void;
};

export default function TilgungstabelleContainer({
  calculationId,
  data,
  input,
  setData,
}: PropTypes) {
  return (
    <div className="max-h-[620px] overflow-auto rounded-lg border border-slate-600 text-sm shadow-lg xl:col-start-1">
      {data && (
        <Tilgungstabelle
          table={data as ArmotizationEntry[]}
          formInput={input}
          setData={setData}
          calculationId={calculationId}
        />
      )}
    </div>
  );
}
