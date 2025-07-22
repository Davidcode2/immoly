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
    <div className="xl:col-start-1 rounded-lg text-sm overflow-auto max-h-[620px] border border-slate-600 shadow-lg">
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
