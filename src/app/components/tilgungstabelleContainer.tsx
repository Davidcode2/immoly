import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import CashRoiModel from "app/lib/models/cashRoiModel";
import Tilgungstabelle from "app/tilgungsTabelle";

type PropTypes = {
  calculationId: string | null;
  table: ArmotizationEntry[] | null;
  input: CashRoiModel | null;
  setTable: (tilgungsTabelle: ArmotizationEntry[]) => void;
};

export default function TilgungstabelleContainer({
  calculationId,
  table,
  input,
  setTable,
}: PropTypes) {
  return (
    <div className="max-h-[620px] row-start-2 md:row-start-1 overflow-auto rounded-lg border border-slate-600 text-sm shadow-lg xl:col-start-1">
      {table && (
        <Tilgungstabelle
          table={table as ArmotizationEntry[]}
          formInput={input}
          setTable={setTable}
          calculationId={calculationId}
        />
      )}
    </div>
  );
}
