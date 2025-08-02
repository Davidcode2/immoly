import { useEffect, useRef, useState } from "react";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import CashRoiModel from "./lib/models/cashRoiModel";
import { updateSondertilgungInDb } from "./lib/sondertilgungDatabaseService";
import SondertilgungInput from "./components/sondertilgungInput";
import { screenWidthMobile } from "./utils/screenWidth";
import CenteredModal from "./components/centeredModal";
import TilgungsWechselModal from "./components/tilgungsWechselModal";
import storeTilgungsWechselInDb from "./lib/tilgungswechselDatabaseService";

type PropTypes = {
  table: ArmotizationEntry[];
  formInput: CashRoiModel | null;
  setTable: (tilgungstabelle: ArmotizationEntry[]) => void;
  sendChangeNotification: () => void;
  calculationId: string | null;
};

export default function Tilgungstabelle({
  table,
  calculationId,
  sendChangeNotification,
}: PropTypes) {
  const [temporaryTable, setTemporaryTable] =
    useState<ArmotizationEntry[]>(table);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const tilgungsWechselModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTemporaryTable(table);
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

  const getSondertilgung = (entry: ArmotizationEntry) => {
    const amount = entry.sondertilgung || "";
    return amount.toLocaleString("de");
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
    sendChangeNotification();
  };

  const handleTilgungsWechsel = async (
    event: React.FormEvent<HTMLFormElement>,
    year: number,
  ) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newTilgung = form.elements.namedItem(
      "newTilgung",
    ) as HTMLInputElement;
    storeTilgungsWechselInDb(Number(newTilgung.value), year, calculationId!);
    sendChangeNotification();
    setShowModal(false);
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const openModal = (e: any, selectedYear: number) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("sondertilgungInput")) return;
    setSelectedYear(selectedYear);
    setShowModal(true);
  };

  document.body.addEventListener("click", (e: MouseEvent) => {
    const contextMenu = tilgungsWechselModalRef.current;
    const target = e.target as HTMLElement;
    if (target.classList.contains("tilgungsWechselModal")) return;
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
          <TilgungsWechselModal
            handleSubmit={handleTilgungsWechsel}
            year={selectedYear!}
          />
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
              onClick={(e) => openModal(e, x.year)}
            >
              <td className="px-4 py-2">{x.year}</td>
              <td className="py-2 sm:px-4">
                {Math.round(x.interest).toLocaleString("de")}
              </td>
              <td className="py-2 sm:px-4">
                {Math.round(x.principal).toLocaleString("de")}
              </td>
              <td
                className={`${x.tilgungswechsel > 0 && "text-sky-500"} py-2 sm:px-4`}
              >
                {x.yearlyRate.toLocaleString("de")}
                {x.tilgungswechsel > 0 && (
                  <div className="text-xs text-green-600">
                    {x.tilgungswechsel.toLocaleString("de")} mntl.
                  </div>
                )}
              </td>
              <td className="py-2 sm:px-4">
                {Math.round(x.remainingPrincipal).toLocaleString("de")}
              </td>
              <td className="sondertilgungInput w-24 py-2 sm:px-4">
                <form
                  onSubmit={(e) => handleSondertilgungSubmit(e, x.year)}
                  className="justify-fit sondertilgungInput flex sm:gap-4"
                >
                  <SondertilgungInput
                    year={x.year}
                    sondertilgung={getSondertilgung(x)}
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
