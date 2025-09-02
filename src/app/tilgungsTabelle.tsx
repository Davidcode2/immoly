import { useEffect, useRef, useState } from "react";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import CashRoiModel from "./lib/models/cashRoiModel";
import SondertilgungInput from "./components/sondertilgungInput";
import { screenWidthMobile } from "./utils/screenWidth";
import CenteredModal from "./components/centeredModal";
import TilgungsWechselModal from "./components/tilgungsWechselModal";
import { updateSonderAmountInBrowserStorage } from "./services/sonderAmountBrowserUpdater";

type PropTypes = {
  table: ArmotizationEntry[];
  formInput: CashRoiModel | null;
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
  const [selectedEntry, setSelectedEntry] = useState<ArmotizationEntry>();
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
    updateSonderAmountInBrowserStorage(
      "sondertilgungen",
      String(year),
      updatedSondertilgungAmount,
      calculationId!
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
    updateSonderAmountInBrowserStorage(
      "tilgungswechsel",
      String(year),
      newTilgung.value,
      calculationId!
    );
    sendChangeNotification();
    setShowModal(false);
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const openModal = (e: any, entry: ArmotizationEntry) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("sondertilgungInput")) return;
    setSelectedEntry(entry);
    setShowModal(true);
  };

  return (
    <div
      ref={tilgungsWechselModalRef}
      className="grid h-fit justify-stretch rounded-lg text-xs lg:text-base"
    >
      {showModal && (
        <CenteredModal onClose={() => setShowModal(false)}>
          <TilgungsWechselModal
            handleSubmit={handleTilgungsWechsel}
            year={selectedEntry!.year!}
            tilgungswechsel={
              selectedEntry!.tilgungswechsel || selectedEntry!.yearlyRate / 12
            }
          />
        </CenteredModal>
      )}
      <table className="table-fixed overflow-auto backdrop-blur-lg dark:bg-neutral-700/20">
        <thead>
          <tr className="sticky top-0 bg-neutral-100 text-left dark:bg-black/90">
            <th className="py-3 pl-2 font-thin sm:pr-2 sm:pl-4 md:py-5">
              Jahr
            </th>
            <th className="py-3 font-thin sm:pl-4 md:py-5">Zins</th>
            <th className="py-3 font-thin sm:px-4 md:py-5">Tilgung</th>
            <th className="hidden py-3 font-thin sm:px-4 md:block md:py-5">
              {screenWidthMobile() ? "Jhl. Rate" : "Jährliche Rate"}
            </th>
            <th className="py-3 font-thin sm:px-4 md:py-5">
              {screenWidthMobile() ? "Rest" : "Restschuld"}
            </th>
            <th className="py-3 font-thin sm:px-4 md:py-5">
              {screenWidthMobile() ? "S.Tilgung" : "Sondertilgung"}
            </th>
          </tr>
        </thead>
        <tbody>
          {temporaryTable.map((x) => (
            <tr
              key={x.year}
              className="hover:cursor-pointer hover:bg-[var(--light-accent)]/40 hover:shadow"
              onClick={(e) => openModal(e, x)}
            >
              <td className="px-4 py-3 md:py-5">{x.year}</td>
              <td className="max-w-12 py-3 sm:px-4 md:max-w-22 md:py-5">
                {Math.round(x.interest).toLocaleString("de")}
              </td>
              <td className="max-w-12 py-3 sm:px-4 md:max-w-22 md:py-5">
                {Math.round(x.principal).toLocaleString("de")}
              </td>
              <td
                className={`${x.tilgungswechsel > 0 && "text-[var(--success)]"} hidden h-18 content-center py-3 sm:px-4 md:block md:py-5`}
              >
                {x.yearlyRate.toLocaleString("de")}
                {x.tilgungswechsel > 0 && (
                  <div className="text-xs text-green-600">
                    {x.tilgungswechsel.toLocaleString("de")} mntl.
                  </div>
                )}
              </td>
              <td className="max-w-12 py-3 sm:px-4 md:max-w-22 md:py-5">
                {Math.round(x.remainingPrincipal).toLocaleString("de")}
              </td>
              <td className="sondertilgungInput w-16 py-3 sm:px-4 md:w-24 md:py-5">
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
