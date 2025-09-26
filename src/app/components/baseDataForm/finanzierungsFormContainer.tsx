import FinanzierungsForm from "app/components/baseDataForm/finanzierungsForm";
import CashRoiModel from "app/lib/models/cashRoiModel";
import Hero from "app/components/hero/hero";

type PropTypes = {
  formValues: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
};

export default function FinanzierungsFormContainer({
  formValues,
  setInput,
}: PropTypes) {
  return (
    <div className="rounded-lg shadow backdrop-blur-2xl md:p-8 lg:dark:shadow-[10px_4px_20px_var(--dark-accent)]/5">
      <div className="pb-4">
        <Hero />
      </div>
      <div className="p-4">
        <FinanzierungsForm values={formValues} setInput={setInput} />
      </div>
    </div>
  );
}
