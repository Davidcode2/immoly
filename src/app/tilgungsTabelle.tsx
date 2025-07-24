import { useEffect, useState } from "react";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import CashRoiModel from "./lib/models/cashRoiModel";
import {
  getSondertilgungen,
  updateSondertilgungInDb,
} from "./lib/storeSondertilgungInDb";
import { Sondertilgung } from "./lib/models/sondertilgung";
import {
  recalcForAllSondertilgungen,
  updateSondertilgungInTable,
  updateSondertilgungForYear,
} from "./lib/sondertilgungHandler";

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
  const [sonderTilgung, setSonderTilgung] = useState<Sondertilgung[]>(
    table.map((x) => ({ year: x.year, amount: x.sondertilgung })),
  );

  useEffect(() => {
    setTemporaryTable(table);
    setSonderTilgung(
      table.map((x) => ({ year: x.year, amount: x.sondertilgung })),
    );
  }, [table]);

  //  useEffect(() => {
  //    const recalculate = async () => {
  //      const newTable = await recalcForAllSondertilgungen(
  //        sonderTilgung!,
  //        table,
  //        formInput,
  //      );
  //      setTable(newTable);
  //    };
  //    recalculate();
  //  }, [sonderTilgung]);

  const handleSonderTilgungChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    year: number,
  ) => {
    const updatedSondertilgungAmount = Number(event.target.value);
    const updatedSondertilgungen = updateSondertilgungForYear(sonderTilgung, year, updatedSondertilgungAmount);
    setSonderTilgung(updatedSondertilgungen);
    setTemporaryTable((prevTable) => {
      return updateSondertilgungInTable(prevTable, year, updatedSondertilgungAmount);
    });
  };

  const getSondertilgungFromForm = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    const form = event.target as HTMLFormElement;
    const sondertilgungAmount = (
      form.elements.namedItem("sonderTilgungAmount") as HTMLInputElement
    ).value;
    return sondertilgungAmount;
  };

  const getSondertilgungAndSet = async () => {
    const sondertilgungen = await getSondertilgungen(calculationId!);
    console.log(sondertilgungen);
    if (sondertilgungen) {
      setSonderTilgung(sondertilgungen);
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
          {temporaryTable.map((x) => (
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
                  onSubmit={(e) => handleSondertilgungSubmit(e, x.year)}
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
