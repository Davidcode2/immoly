import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import CashRoiModel from "app/lib/models/cashRoiModel";
import TilgungstabelleContainer from "./tilgungstabelleContainer";

type PropTypes = {
  table: ArmotizationEntry[];
  calculationId: string | null;
  input: CashRoiModel | null;
  changeHandler: () => void;
};
export default function MobileTilgungsTabelleContainer({
  table,
  calculationId,
  input,
  changeHandler,
}: PropTypes) {
  return (
    <div className="mx-4 my-14 sm:mx-0 md:hidden">
      <div className="grid grid-cols-2 gap-4 my-4">
        <div className="shadow p-4 grid grid-cols-[50px_1fr] rounded-lg">
          <div className="p-2 h-10 w-10 text-center rounded-full bg-[var(--primary)]">1</div>
          <div>Tippe auf einen Eintrag um einen Tilgungswechsel vorzunehmen</div>
        </div>
        <div className="shadow p-4 grid grid-cols-[50px_1fr] rounded-lg">
          <div className="p-2 h-10 w-10 text-center rounded-full bg-[var(--primary)]">2</div>
          <div>Erstelle eine Sondertilgung mit dem Pluszeichen</div>
        </div>
      </div>
      <TilgungstabelleContainer
        table={table}
        calculationId={calculationId}
        input={input}
        sendChangeNotification={changeHandler}
      />
    </div>
  );
}
