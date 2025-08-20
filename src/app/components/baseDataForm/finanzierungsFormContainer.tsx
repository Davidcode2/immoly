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
    <div className="md:p-8 rounded-lg from-neutral-400/10 to-neutral-950/20 shadow backdrop-blur-2xl dark:bg-gradient-to-tl">
      <div className="pb-4">
        <Hero />
      </div>
      <div className="p-4">
        <FinanzierungsForm values={formValues} setInput={setInput} />
      </div>
    </div>
  );
}
