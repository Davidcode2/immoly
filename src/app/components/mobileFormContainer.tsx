"use client";

import CashRoiModel from "app/lib/models/cashRoiModel";
import FinanzierungsForm from "./baseDataForm/finanzierungsForm";
import { DraggableContainer } from "./drawer/drawer";

type PropTypes = {
  input: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
};

export default function MobileFormContainer({ input, setInput }: PropTypes) {
  return (
      <DraggableContainer
        className={
          "sticky -bottom-5 z-30 ml-[calc(50%-50vw)] w-screen rounded-t-2xl border border-[var(--light-accent)]/20 bg-[var(--background)]/70 backdrop-blur-lg md:hidden"
        }
      >
        <div className="rounded-2xl">
          <div
            className={`} overflow-scroll transition-all duration-300 ease-in-out`}
          >
            <FinanzierungsForm values={input} setInput={setInput} />
          </div>
        </div>
      </DraggableContainer>
  );
}
