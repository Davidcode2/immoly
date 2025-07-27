import FinanzierungsForm from "app/finanzierungsForm";
import CashRoiModel from "app/lib/models/cashRoiModel";
import Hero from "./hero";

type PropTypes = {
  formValues: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
};

export default function FinanzierungsFormContainer({
  formValues,
  setInput,
}: PropTypes) {
  return (
    <div className="rounded-lg border border-purple-500/30 bg-gradient-to-tl from-purple-800/30 to-neutral-900/70 p-4 shadow backdrop-blur-2xl md:p-8">
      <Hero />
      <FinanzierungsForm values={formValues} setInput={setInput} />
    </div>
  );
}
