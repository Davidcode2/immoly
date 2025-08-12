import CashRoiModel from "app/lib/models/cashRoiModel";
import FinanzierungsForm from "./baseDataForm/finanzierungsForm";
import { useState } from "react";
import ChevronIcon from "/public/images/icons/icons8-chevron-24.png";
import Image from "next/image";

type PropTypes = {
  input: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
};

export default function MobileFormContainer({ input, setInput }: PropTypes) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="sticky -bottom-2 z-30 rounded-2xl border border-[var(--light-accent)]/20 bg-[var(--background)]/70 shadow backdrop-blur-lg md:hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-2"
      >
        {isExpanded ? (
          <Image src={ChevronIcon} alt="Chevron pointing downward" className="mx-auto rotate-270 h-9 w-9" />
        ) : (
          <Image src={ChevronIcon}  alt="Chevron pointing upward" className="mx-auto rotate-90 h-9 w-9" />
        )}
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[400px] py-8" : "max-h-[48px]"
        }`}
      >
        <FinanzierungsForm values={input} setInput={setInput} />
      </div>
    </div>
  );
}
