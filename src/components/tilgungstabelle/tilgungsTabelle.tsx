import { useEffect, useRef, useState } from "react";
import ArmotizationEntry from "@/lib/models/ArmotizationEntry";
import CashRoiModel from "@/lib/models/cashRoiModel";
import SondertilgungDisplay from "./sondertilgungDisplay";
import { screenWidthMobile } from "@/utils/screenWidth";
import CenteredModal from "@/components/centeredModal";
import TilgungsWechselModal from "@/components/tilgungstabelle/tilgungsWechselModal";
import { updateSonderAmountInBrowserStorage } from "@/services/sonderAmountBrowserUpdater";
import SondertilgungModal from "@/components/tilgungstabelle/sondertilgungModal";

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
  const [showTilgungswechselModal, setShowTilgungswechselModal] =
    useState<boolean>(false);
  const [showSondertilgungModal, setShowSondertilgungModal] =
    useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<ArmotizationEntry>();
  const tilgungsWechselModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTemporaryTable(table);
  }, [table]);

  const getSondertilgung = (entry: ArmotizationEntry) => {
    const amount = entry.sondertilgung || "";
    return amount.toLocaleString("de");
  };

  const handleSondertilgungSubmit = async (
    updatedSondertilgungAmount: string,
    year: number,
  ) => {
    if (
      Number(updatedSondertilgungAmount) < 1000
    ) return;
    updateSonderAmountInBrowserStorage(
      "sondertilgungen",
      String(year),
      updatedSondertilgungAmount,
      calculationId!,
    );
    sendChangeNotification();
    setShowSondertilgungModal(false);
  };

  const updateTilgungswechsel = (newTilgung: string, year: number) => {
    if (Number(newTilgung) !== selectedEntry!.yearlyRate / 12) {
      updateSonderAmountInBrowserStorage(
        "tilgungswechsel",
        String(year),
        newTilgung,
        calculationId!,
      );
    }
  };

  const updateZinswechsel = (newZins: string, year: number) => {
    if (newZins.includes(",")) {
      newZins = newZins.replace(",", ".");
    }
    if (
      Number(newZins) !==
      (selectedEntry!.interest /
        (selectedEntry!.remainingPrincipal + selectedEntry!.principal)) *
      100
    ) {
      updateSonderAmountInBrowserStorage(
        "zinswechsel",
        String(year),
        newZins,
        calculationId!,
      );
    }
  };

  const handleTilgungsWechsel = async (
    newTilgung: string,
    newZins: string,
    year: number,
  ) => {
    updateTilgungswechsel(newTilgung, year);
    updateZinswechsel(newZins, year);
    sendChangeNotification();
    setShowTilgungswechselModal(false);
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const openTilgungswechselModal = (e: any, entry: ArmotizationEntry) => {
    const target = e.target as HTMLElement;
    if (target.closest(".sondertilgungInput")) return;
    setSelectedEntry(entry);
    setShowTilgungswechselModal(true);
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const openSondertilgungModal = (e: any, entry: ArmotizationEntry) => {
    setSelectedEntry(entry);
    setShowSondertilgungModal(true);
  };

  return (
    <div
      ref={tilgungsWechselModalRef}
      className="grid h-fit justify-stretch rounded-lg text-xs xl:text-base"
    >
      {showTilgungswechselModal && (
        <CenteredModal
          onClose={() => setShowTilgungswechselModal(false)}
          historyState={{ modalId: "repayment-change" }}
        >
          <TilgungsWechselModal
            handleSubmit={handleTilgungsWechsel}
            year={selectedEntry!.year!}
            tilgungswechsel={
              selectedEntry!.tilgungswechsel ||
              Math.round(selectedEntry!.yearlyRate / 12)
            }
            zinswechsel={
              selectedEntry!.zinswechsel ||
              (selectedEntry!.interest /
                (selectedEntry!.remainingPrincipal +
                  selectedEntry!.principal)) *
              100
            }
          />
        </CenteredModal>
      )}
      {showSondertilgungModal && (
        <CenteredModal
          onClose={() => setShowSondertilgungModal(false)}
          historyState={{ modalId: "special-repayment" }}
        >
          <SondertilgungModal
            handleSubmit={handleSondertilgungSubmit}
            year={selectedEntry!.year!}
            sondertilgung={selectedEntry!.sondertilgung || 0}
          />
        </CenteredModal>
      )}
      <table className="table-fixed overflow-auto backdrop-blur-lg">
        <thead>
          <tr className="sticky top-0 bg-neutral-100 text-left dark:bg-black/90">
            <th className="py-3 pl-2 font-normal sm:pr-2 sm:pl-4 md:py-5">
              Jahr
            </th>
            <th className="py-3 font-normal sm:pl-4 md:py-5">Zins</th>
            <th className="py-3 font-normal sm:px-4 md:py-5">Tilgung</th>
            <th className="hidden py-3 font-normal sm:px-4 md:block md:py-5">
              {screenWidthMobile() ? "Jhl. Rate" : "Jährliche Rate"}
            </th>
            <th className="py-3 font-normal sm:px-4 md:py-5">
              {screenWidthMobile() ? "Rest" : "Restschuld"}
            </th>
            <th className="py-3 font-normal sm:px-4 md:py-5">
              {screenWidthMobile() ? "S.Tilgung" : "Sondertilgung"}
            </th>
          </tr>
        </thead>
        <tbody>
          {temporaryTable.map((x) => (
            <tr
              key={x.year}
              className={`hover:cursor-pointer hover:bg-[var(--light-accent)]/40 hover:shadow ${x.zinswechsel > 0 && "border-t border-[var(--primary)]"}`}
              onClick={(e) => openTilgungswechselModal(e, x)}
            >
              <td className="px-4 py-3 md:py-5">{x.year}</td>
              <td className="max-w-12 py-3 sm:px-4 md:max-w-22 md:py-5">
                {Math.round(x.interest).toLocaleString("de")}
                {x.zinswechsel > 0 && (
                  <div className="text-xs text-[var(--dark-success)]">
                    {x.zinswechsel.toLocaleString("de")} %
                  </div>
                )}
              </td>
              <td className="max-w-12 py-3 sm:px-4 md:max-w-22 md:py-5">
                {Math.round(x.principal).toLocaleString("de")}
                <div className="md:hidden">
                  {x.tilgungswechsel > 0 && (
                    <div className="text-xs text-[var(--dark-success)]">
                      {x.tilgungswechsel.toLocaleString("de")} mntl.
                    </div>
                  )}
                </div>
              </td>
              <td
                className={`${x.tilgungswechsel > 0 && "text-[var(--success)]"} hidden h-18 content-center py-3 sm:px-4 md:block md:py-5`}
              >
                {x.yearlyRate.toLocaleString("de")}
                {x.tilgungswechsel > 0 && (
                  <div className="text-xs text-[var(--dark-success)]">
                    {x.tilgungswechsel.toLocaleString("de")} mntl.
                  </div>
                )}
              </td>
              <td className="max-w-12 py-3 sm:px-4 md:max-w-22 md:py-5">
                {Math.round(x.remainingPrincipal).toLocaleString("de")}
              </td>
              <td
                onClick={(e) => openSondertilgungModal(e, x)}
                className="sondertilgungInput w-16 py-3 sm:px-4 md:w-24 md:py-5"
              >
                <div className="justify-fit sondertilgungInput flex sm:gap-4">
                  <SondertilgungDisplay
                    year={x.year}
                    sondertilgung={getSondertilgung(x)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
