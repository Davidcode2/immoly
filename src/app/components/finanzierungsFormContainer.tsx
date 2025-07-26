import FinanzierungsForm from "app/finanzierungsForm";
import Image from "next/image";
import IconsHeader from "./iconsHeader";
import CalculationResult from "app/lib/models/CalculationResult";
import CashRoiModel from "app/lib/models/cashRoiModel";

type PropTypes = {
  formValues: CalculationResult[] | null;
  setInput: (data: CashRoiModel) => void;
};

export default function FinanzierungsFormContainer({
  formValues,
  setInput,
}: PropTypes) {
  return (
    <div className="rounded-lg border border-purple-500/30 bg-gradient-to-tl from-purple-800/30 to-neutral-900/70 p-4 shadow backdrop-blur-2xl md:p-8">
      <Image
        src="/immoly_logo_square_transparent_text.webp"
        width={200}
        height={10}
        alt="Logo"
        className="mx-auto md:mb-16"
      />
      <div className="mx-auto p-4 md:hidden">
        <IconsHeader />
      </div>
      <div className="mb-10 p-4 text-center font-bold md:hidden">
        Die Plattform für Immobilienkredite. Kalkulieren Sie was möglich ist.
      </div>
      <FinanzierungsForm values={formValues} setInput={setInput} />
    </div>
  );
}
