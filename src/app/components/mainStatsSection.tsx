import Scenario from "app/scenario";
import NebenkostenDisplay from "./nebenkostenDisplay";
import KreditSummeTextComponent from "./kreditSummeTextComponent";
import CashRoiModel from "app/lib/models/cashRoiModel";
import ArmotizationEntry from "app/lib/models/ArmotizationEntry";

type PropTypes = {
  userInput: CashRoiModel | null;
  selectedScenario: string | null;
  table: ArmotizationEntry[];
};

export default function MainStatsSection({
  userInput,
  selectedScenario,
  table,
}: PropTypes) {
  return (
    <div className="top-10 z-20 mt-0 mb-10 grid justify-stretch gap-y-14 md:m-0 2xl:h-56 md:gap-6 sm:grid-cols-2 2xl:sticky 2xl:grid-cols-4">
      <KreditSummeTextComponent
        principal={Number(userInput?.principal)}
        downPayment={Number(userInput?.down_payment)}
      />
      <Scenario calculationId={selectedScenario} data={table} />
      <NebenkostenDisplay calculationData={userInput} />
    </div>
  );
}
