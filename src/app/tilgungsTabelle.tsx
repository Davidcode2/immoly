import { useEffect, useState } from "react";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import calcTilgung from "./lib/calculateArmotizaztionTable";
import CashRoiModel from "./lib/models/cashRoiModel";
import {
  getSondertilgungen,
  updateSondertilgungInDb,
} from "./lib/storeSondertilgungInDb";

type PropTypes = {
  table: ArmotizationEntry[];
  formInput: CashRoiModel | null;
  setData: (tilgungstabelle: ArmotizationEntry[]) => void;
  calculationId: string | null;
};

export default function Tilgungstabelle({
  table,
  formInput,
  setData,
  calculationId,
}: PropTypes) {
  const [tilgungsTabelle, setTilgungstabelle] = useState(table);

  useEffect(() => {
    setTilgungstabelle(table);
  }, [table]);

  const _calcSondertilgung = async (
    event: React.FormEvent<HTMLFormElement>,
    year: number,
  ) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const sondertilgungAmount = (
      form.elements.namedItem("sonderTilgungAmount") as HTMLInputElement
    ).value;
    console.log("year when setting sondertilgung:", year);
    await updateSondertilgungInDb(
      Number(calculationId),
      year,
      Number(sondertilgungAmount),
    );
    const sondertilgungen = await getSondertilgungen(calculationId!);
    console.log("sondertilgungen after update:", sondertilgungen);
    //const newTable = await recalcTable(year, Number(sondertilgungAmount));
    const newTable = await recalcForAllSondertilgungen();
    setTilgungstabelle(newTable);
    setData(newTable);
  };

  const recalcTable = async (year: number, sondertilgung: number) => {
    // recalc only for last year (implementation below) if the latest entry is the last year
    // recalc only for the subsequent years if the latest entry is not the last year
    const tableUpToSondertilgung = tilgungsTabelle.filter(
      (x: ArmotizationEntry) => x.year < year,
    );
    const impactedEntry = tilgungsTabelle.find(
      (x: ArmotizationEntry) => x.year === year,
    );
    if (!impactedEntry) {
      return table;
    }
    if (formInput && formInput.interest_rate && formInput.monthly_rate) {
      const tableFromSondertilgung = calcTilgung({
        principal: impactedEntry.remainingPrincipal - sondertilgung,
        down_payment: 0,
        interest_rate: formInput.interest_rate,
        monthly_rate: formInput.monthly_rate,
        rent: formInput?.rent || 0,
      });
      tableFromSondertilgung.forEach((x: ArmotizationEntry) => {
        x.year = x.year + year;
      });

      const newTable: ArmotizationEntry[] = tableUpToSondertilgung;
      newTable.push(impactedEntry);
      newTable.push(...tableFromSondertilgung);
      return newTable;
    }
    return table;
  };

  const recalcForAllSondertilgungen = async () => {
    const sondertilgungen = await getSondertilgungen(calculationId!);
    console.log(sondertilgungen);
    if (!sondertilgungen) {
      return tilgungsTabelle;
    }
    sondertilgungen.sort((a, b) => a.year - b.year);
    if (formInput && formInput.interest_rate && formInput.monthly_rate) {
      const newTable = [...tilgungsTabelle];
      tilgungsTabelle.forEach((tableRow: ArmotizationEntry) => {
        const tableRowNew = newTable.find(x => x.year === tableRow.year);
        if (!tableRowNew) {
          return newTable;
        }
        const sondertilgung = sondertilgungen.find(
          (y) => y.year === tableRow.year,
        );
        if (sondertilgung) {
          console.log(
            `table row - amount: ${(tableRow.remainingPrincipal - sondertilgung.amount).toLocaleString("de")}\nyear: ${tableRow.year}\namount: ${sondertilgung.amount}`,
          );
          const newReducedPrincipal = tableRowNew.remainingPrincipal - sondertilgung.amount;
          if (newReducedPrincipal < 0) {
            return newTable;
          }
          const newTilgung = calcTilgung({
            principal: newReducedPrincipal,
            down_payment: 0,
            interest_rate: formInput?.interest_rate,
            monthly_rate: formInput?.monthly_rate,
            rent: formInput?.rent || 0,
          });
          newTilgung.forEach((x: ArmotizationEntry) => {
            x.year = x.year + tableRow.year;
          });
          newTable.splice(
            tilgungsTabelle.indexOf(tableRow) + 1,
            newTable.length,
            ...newTilgung,
          );
        }
      });
      return newTable;
    } else {
      return tilgungsTabelle;
    }
  };

  const screenWidthMobile = () => {
    return window.innerWidth < 640;
  };

  return (
    <div className="rounded-lg grid justify-stretch text-xs lg:text-base">
      <table className="overflow-auto table-fixed">
        <thead>
          <tr className="sticky text-left top-0 bg-black">
            <th className="sm:pl-4 pl-2 sm:pr-2 py-2">Jahr</th>
            <th className="sm:pl-4 py-2">Zins</th>
            <th className="sm:px-4 py-2">Tilgung</th>
            <th className="sm:px-4 py-2">
              {screenWidthMobile() ? "Jhl. Rate" : "Jährliche Rate"}
            </th>
            <th className="sm:px-4 py-2">
              {screenWidthMobile() ? "Rest" : "Restschuld"}
            </th>
            <th className="sm:px-4 py-2">
              {screenWidthMobile() ? "S.Tilgung" : "Sondertilgung"}
            </th>
          </tr>
        </thead>
        <tbody>
          {tilgungsTabelle.map((x) => (
            <tr
              key={x.year}
              className="hover:bg-purple-600 even:bg-[#0f0f0f] border-t border-gray-950"
            >
              <td className="px-4 py-2">{x.year}</td>
              <td className="sm:px-4 py-2">
                {Math.round(x.interest).toLocaleString()}
              </td>
              <td className="sm:px-4 py-2">
                {Math.round(x.principal).toLocaleString()}
              </td>
              <td className="sm:px-4 py-2">{x.yearlyRate.toLocaleString()}</td>
              <td className="sm:px-4 py-2">
                {Math.round(x.remainingPrincipal).toLocaleString()}
              </td>
              <td className="sm:px-4 py-2 w-24">
                <form
                  onSubmit={(e) => _calcSondertilgung(e, x.year)}
                  className="flex sm:gap-4 justify-fit"
                >
                  <button className="hover:cursor-pointer text-gray-800 hover:text-gray-200">
                    +
                  </button>
                  <input
                    size={3}
                    type="number"
                    name="sonderTilgungAmount"
                    className="text-green-400 rounded-md text-sm p-[3px] active:text-gray-200 w-20"
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
