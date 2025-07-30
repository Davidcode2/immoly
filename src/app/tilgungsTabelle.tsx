import { useEffect, useRef, useState } from "react";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import CashRoiModel from "./lib/models/cashRoiModel";
import {
  getSondertilgungen,
  updateSondertilgungInDb,
} from "./lib/storeSondertilgungInDb";
import { Sondertilgung } from "./lib/models/sondertilgung";
import { recalcForAllSondertilgungen } from "./lib/sondertilgungHandler";
import SondertilgungInput from "./components/sondertilgungInput";
import { screenWidthMobile } from "./utils/screenWidth";
import CenteredModal from "./components/centeredModal";
import TilgungsWechselModal from "./components/tilgungsWechselModal";

type PropTypes = {
  table: ArmotizationEntry[];
  formInput: CashRoiModel | null;
  setTable: (tilgungstabelle: ArmotizationEntry[]) => void;
  calculationId: string | null;
};

export default function Tilgungstabelle({
  table,
  formInput,
  setTable,
  calculationId,
}: PropTypes) {
  const [temporaryTable, setTemporaryTable] =
    useState<ArmotizationEntry[]>(table);
  const [showModal, setShowModal] = useState<boolean>(false);
  const tilgungsWechselModalRef = useRef<HTMLDivElement>(null);
  const [sonderTilgungen, setSonderTilgungen] = useState<Sondertilgung[]>(
    table.map((x) => ({ year: x.year, amount: x.sondertilgung })),
  );

  useEffect(() => {
    setTemporaryTable(table);
    getSondertilgungAndSet();
  }, [table]);

  const getSondertilgungFromForm = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    const form = event.target as HTMLFormElement;
    const sondertilgungAmount = (
      form.elements.namedItem("sonderTilgungAmount") as HTMLInputElement
    ).value;
    return sondertilgungAmount;
  };

  const getSondertilgung = (year: number) => {
    const sondertilgung = sonderTilgungen.find(
      (y: Sondertilgung) => y.year === year,
    );
    const amount = sondertilgung?.amount || "";
    return String(amount);
  };

  const getSondertilgungAndSet = async () => {
    const sondertilgungen = await getSondertilgungen(calculationId!);
    if (sondertilgungen) {
      setSonderTilgungen(sondertilgungen);
      return sondertilgungen;
    }
  };

  const handleSondertilgungSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    year: number,
  ) => {
    event.preventDefault();
    const updatedSondertilgungAmount = getSondertilgungFromForm(event);
    await updateSondertilgungInDb(
      Number(calculationId),
      year,
      Number(updatedSondertilgungAmount),
    );
    const sondertilgungen = await getSondertilgungAndSet();
    const newTable = await recalcForAllSondertilgungen(
      sondertilgungen!,
      table,
      formInput,
    );
    setTable(newTable);
  };

  const openModal = () => {
    setShowModal(true);
  };

  document.body.addEventListener("click", (e: any) => {
    const contextMenu = tilgungsWechselModalRef.current;
    if (e.target.classList.contains("tilgungsWechselModal")) return;
    if (showModal) {
      setShowModal(false);
      contextMenu?.classList.remove("open");
    }
  });

  return (
    <div
      ref={tilgungsWechselModalRef}
      className="grid h-[600px] justify-stretch rounded-lg text-xs lg:text-base"
    >
      {showModal && (
        <CenteredModal>
          <TilgungsWechselModal />
        </CenteredModal>
      )}
      <table className="table-fixed overflow-auto bg-neutral-800/20 backdrop-blur-lg">
        <thead>
          <tr className="sticky top-0 bg-black/90 text-left">
            <th className="py-2 pl-2 sm:pr-2 sm:pl-4">Jahr</th>
            <th className="py-2 sm:pl-4">Zins</th>
            <th className="py-2 sm:px-4">Tilgung</th>
            <th className="py-2 sm:px-4">
              {screenWidthMobile() ? "Jhl. Rate" : "Jährliche Rate"}
            </th>
            <th className="py-2 sm:px-4">
              {screenWidthMobile() ? "Rest" : "Restschuld"}
            </th>
            <th className="py-2 sm:px-4">
              {screenWidthMobile() ? "S.Tilgung" : "Sondertilgung"}
            </th>
          </tr>
        </thead>
        <tbody>
          {temporaryTable.map((x) => (
            <tr
              key={x.year}
              className="border-t border-gray-950 even:bg-[#0f0f0f]/40 hover:bg-purple-700"
              onClick={openModal}
            >
              <td className="px-4 py-2">{x.year}</td>
              <td className="py-2 sm:px-4">
                {Math.round(x.interest).toLocaleString("de")}
              </td>
              <td className="py-2 sm:px-4">
                {Math.round(x.principal).toLocaleString("de")}
              </td>
              <td className="py-2 sm:px-4">
                {x.yearlyRate.toLocaleString("de")}
              </td>
              <td className="py-2 sm:px-4">
                {Math.round(x.remainingPrincipal).toLocaleString("de")}
              </td>
              <td className="w-24 py-2 sm:px-4">
                <form
                  onSubmit={(e) => handleSondertilgungSubmit(e, x.year)}
                  className="justify-fit flex sm:gap-4"
                >
                  <SondertilgungInput
                    year={x.year}
                    sondertilgung={getSondertilgung(x.year)}
                  />
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
