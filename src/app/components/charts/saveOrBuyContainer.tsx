import ArmotizationEntry from "app/lib/models/ArmotizationEntry";
import DevelopmentChart from "./developmentChart";
import CashRoiModel from "app/lib/models/cashRoiModel";
import { useState } from "react";
import CenteredModal from "../centeredModal";
import SaveOrBuyModal from "./saveOrBuyModal";

type PropTypes = {
  table: ArmotizationEntry[];
  input: CashRoiModel;
  setInput: (arg1: CashRoiModel) => void;
};

export default function SaveOrBuyContainer({
  input,
  setInput,
  table,
}: PropTypes) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal && (
        <CenteredModal onClose={() => setShowModal(false)}>
          <SaveOrBuyModal table={table} input={input} setInput={setInput} />
        </CenteredModal>
      )}
      <div className="group cursor-pointer" onClick={() => setShowModal(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mt-2 ml-auto size-6 rotate-90 opacity-60 group-hover:opacity-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
        <div className="h-[180px] min-h-[260px] rounded-lg">
          <DevelopmentChart
            tilgungsTabelle={table}
            rent={input.rent}
            interest={input.cash_roi || 0}
          />
        </div>
      </div>
    </div>
  );
}
