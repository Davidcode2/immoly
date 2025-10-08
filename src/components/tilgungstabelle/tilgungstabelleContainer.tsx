import ArmotizationEntry from "@/lib/models/ArmotizationEntry";
import CashRoiModel from "@/lib/models/cashRoiModel";
import Tilgungstabelle from "@/components/tilgungstabelle/tilgungsTabelle";

type PropTypes = {
  calculationId: string | null;
  table: ArmotizationEntry[] | null;
  input: CashRoiModel | null;
  sendChangeNotification: () => void;
};

export default function TilgungstabelleContainer({
  calculationId,
  table,
  input,
  sendChangeNotification,
}: PropTypes) {
  return (
    <div className="max-h-[200px] md:max-h-[615px] row-start-2 md:row-start-1 overflow-auto rounded-lg text-sm shadow xl:col-start-1">
      {table && (
        <Tilgungstabelle
          table={table as ArmotizationEntry[]}
          formInput={input}
          calculationId={calculationId}
          sendChangeNotification={sendChangeNotification}
        />
      )}
    </div>
  );
}
