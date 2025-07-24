import { useEffect, useState } from "react";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import calcTilgung from "./lib/calculateArmotizaztionTable";
import CashRoiModel from "./lib/models/cashRoiModel";
import {
  getSondertilgungen,
  updateSondertilgungInDb,
} from "./lib/storeSondertilgungInDb";
import { Sondertilgung } from "./lib/models/sondertilgung";
import { updateSondertilgung } from "./lib/sondertilgungHandler";

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
  const [sonderTilgung, setSonderTilgung] = useState<Sondertilgung[]>(
    tilgungsTabelle.map((x) => ({ year: x.year, amount: x.sondertilgung })),
  );

  useEffect(() => {
    setTilgungstabelle(table);
    setSonderTilgung(
      table.map((x) => ({ year: x.year, amount: x.sondertilgung })),
    );
  }, [table]);

  const handleSonderTilgungChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    year: number,
  ) => {
    const updatedYear = Number(event.target.name);
    const updatedSondertilgung = Number(event.target.value);
    setSonderTilgung(
      sonderTilgung.map((x) => {
        if (x.year === year) {
          x.amount = updatedSondertilgung;
        }
        return x;
      }),
    );
    setTilgungstabelle((prevTable) => {
      return updateSondertilgung(prevTable, updatedYear, updatedSondertilgung);
    });
  };

  const _calcSondertilgung = async (
    event: React.FormEvent<HTMLFormElement>,
    year: number,
  ) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const sondertilgungAmount = (
      form.elements.namedItem("sonderTilgungAmount") as HTMLInputElement
    ).value;
    await updateSondertilgungInDb(
      Number(calculationId),
      year,
      Number(sondertilgungAmount),
    );
    const sondertilgungen = await getSondertilgungen(calculationId!);
    console.log(sondertilgungen);
    if (sondertilgungen) {
      setSonderTilgung(sondertilgungen);
    }
    const newTable = await recalcForAllSondertilgungen(sondertilgungen);
    setTilgungstabelle(newTable);
    setData(newTable);
  };

  const recalcForAllSondertilgungen = async (
    sondertilgungen: Sondertilgung[] | undefined,
  ) => {
    if (!sondertilgungen) {
      return tilgungsTabelle;
    }
    sondertilgungen.sort((a, b) => a.year - b.year);
    if (formInput && formInput.interest_rate && formInput.monthly_rate) {
      const newTable = [...tilgungsTabelle];
      tilgungsTabelle.forEach((tableRow: ArmotizationEntry) => {
        const tableRowNew = newTable.find((x) => x.year === tableRow.year);
        if (!tableRowNew) {
          return newTable;
        }
        const sondertilgung = sondertilgungen.find(
          (y) => y.year === tableRow.year,
        );
        if (sondertilgung) {
          const newReducedPrincipal =
            tableRowNew.remainingPrincipal - sondertilgung.amount;
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
    <div className="grid justify-stretch rounded-lg text-xs backdrop-blur-lg lg:text-base">
      <table className="table-fixed overflow-auto">
        <thead>
          <tr className="sticky top-0 bg-black text-left">
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
          {tilgungsTabelle.map((x) => (
            <tr
              key={x.year}
              className="border-t border-gray-950 even:bg-[#0f0f0f]/20 hover:bg-purple-600"
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
                  onSubmit={(e) => _calcSondertilgung(e, x.year)}
                  className="justify-fit flex sm:gap-4"
                >
                  <button className="text-gray-800 hover:cursor-pointer hover:text-gray-200">
                    +
                  </button>
                  <input
                    size={3}
                    type="number"
                    name="sonderTilgungAmount"
                    value={
                      sonderTilgung.find((y) => y.year === x.year)?.amount || ""
                    }
                    onChange={(e) => handleSonderTilgungChange(e, x.year)}
                    className="w-20 rounded-md p-[3px] text-sm text-green-400 active:text-gray-200"
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
