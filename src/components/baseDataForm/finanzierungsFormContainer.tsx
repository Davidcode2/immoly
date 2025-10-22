import FinanzierungsForm from "@/components/baseDataForm/finanzierungsForm";
import CashRoiModel from "@/lib/models/cashRoiModel";
import Hero from "@/components/hero/hero";

type PropTypes = {
  formValues: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
  showButton?: boolean;
};

export default function FinanzierungsFormContainer({
  formValues,
  setInput,
  showButton = true,
}: PropTypes) {
  return (
    <div className="2xl:block rounded-lg shadow backdrop-blur-2xl md:p-8 lg:dark:shadow-[10px_4px_20px_var(--dark-accent)]/5">
      <div className="flex lg:block justify-center pb-14">
        <Hero />
      </div>
      <div className="p-4">
        <FinanzierungsForm showButton={showButton} values={formValues} setInput={setInput} />
      </div>
    </div>
  );
}
