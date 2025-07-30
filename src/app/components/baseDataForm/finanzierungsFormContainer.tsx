import FinanzierungsForm from "app/components/baseDataForm/finanzierungsForm";
import CashRoiModel from "app/lib/models/cashRoiModel";
import Hero from "app/components/hero";

type PropTypes = {
  formValues: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
};

export default function FinanzierungsFormContainer({
  formValues,
  setInput,
}: PropTypes) {
  return (
    <div className="rounded-lg border border-stone-500/30 bg-gradient-to-tl from-purple-800/20 to-neutral-900/40 p-4 shadow backdrop-blur-2xl md:p-8">
      <Hero />
      <FinanzierungsForm values={formValues} setInput={setInput} />
    </div>
  );
}
