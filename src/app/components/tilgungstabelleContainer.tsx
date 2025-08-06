import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import CashRoiModel from "app/lib/models/cashRoiModel";
import Tilgungstabelle from "app/tilgungsTabelle";

type PropTypes = {
  calculationId: string | null;
  table: ArmotizationEntry[] | null;
  input: CashRoiModel | null;
  sendChangeNotification: () => void;
  setTable: (tilgungsTabelle: ArmotizationEntry[]) => void;
};

export default function TilgungstabelleContainer({
  calculationId,
  table,
  input,
  setTable,
  sendChangeNotification,
}: PropTypes) {
  return (
    <div className="max-h-[200px] md:max-h-[615px] row-start-2 md:row-start-1 overflow-auto rounded-lg text-sm shadow xl:col-start-1">
      {table && (
        <Tilgungstabelle
          table={table as ArmotizationEntry[]}
          formInput={input}
          setTable={setTable}
          calculationId={calculationId}
          sendChangeNotification={sendChangeNotification}
        />
      )}
    </div>
  );
}
