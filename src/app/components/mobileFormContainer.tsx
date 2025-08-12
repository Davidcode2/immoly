import CashRoiModel from "app/lib/models/cashRoiModel";
import FinanzierungsForm from "./baseDataForm/finanzierungsForm";

type PropTypes = {
  input: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
};

export default function MobileFormContainer({ input, setInput }: PropTypes) {
  return (
    <div className="sticky -bottom-2 z-30 overflow-y-auto rounded-2xl border border-[var(--light-accent)]/20 bg-[var(--background)]/70 py-8 shadow backdrop-blur-lg md:hidden">
      <div className="max-h-[400px]">
        <FinanzierungsForm values={input} setInput={setInput} />
      </div>
    </div>
  );
}
