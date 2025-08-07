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
    <div className="mt-0 mb-10 md:sticky top-10 z-30 grid justify-stretch gap-y-14 md:m-0 md:h-56 md:gap-6 lg:grid-cols-[1fr_1fr_100px] 2xl:grid-cols-4">
      <KreditSummeTextComponent
        principal={Number(userInput?.principal)}
        downPayment={Number(userInput?.down_payment)}
      />
      <Scenario calculationId={selectedScenario} data={table} />
      <NebenkostenDisplay calculationData={userInput} />
    </div>
  );
}
