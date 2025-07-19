import { useEffect, useState } from "react";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import calcTilgung from "./lib/calculateArmotizaztionTable";
import CashRoiModel from "./lib/models/cashRoiModel";

type PropTypes = {
  table: ArmotizationEntry[];
  formInput: CashRoiModel | null
};

export default function Tilgungstabelle({ table, formInput }: PropTypes) {
  const [tilgungsTabelle, setTilgungstabelle] = useState(table);
  
  useEffect(() => {
    setTilgungstabelle(table);
  }, [table]);

  const _calcSondertilgung = (event: React.FormEvent<HTMLFormElement>, year: number) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const sondertilgungAmount = (form.elements.namedItem('sonderTilgungAmount') as HTMLInputElement).value;
    const newTable = recalcTable(year, Number(sondertilgungAmount));
    setTilgungstabelle(newTable);
  };

  const recalcTable = (year: number, sondertilgung: number) => {
    const tableUpToSondertilgung = tilgungsTabelle.filter(
      (x: ArmotizationEntry) => x.year < year,
    );
    const impactedEntry = tilgungsTabelle.find(
      (x: ArmotizationEntry) => x.year === year,
    );
    if (!impactedEntry) {
      return table;
    }
    const tableFromSondertilgung = calcTilgung({
      principal: impactedEntry.remainingPrincipal - sondertilgung,
      down_payment: 0,
      interest_rate: formInput?.interest_rate || 3,
      monthly_rate: formInput?.monthly_rate || 1500,
      rent: formInput?.rent || 0,
    });
    tableFromSondertilgung.map((x: ArmotizationEntry) => {
      x.year = x.year + year;
      return x;
    });

    const newTable: ArmotizationEntry[] = tableUpToSondertilgung;
    newTable.push(impactedEntry);
    newTable.push(...tableFromSondertilgung);
    return newTable;
  };

  const screenWidthMobile = () => {
    return window.innerWidth < 640;
  }

  return (
    <div className="rounded-lg grid justify-stretch text-xs lg:text-base">
      <table className="overflow-auto table-fixed">
        <thead>
          <tr className="sticky text-left top-0 bg-black">
            <th className="sm:pl-4 pl-2 sm:pr-2 py-2">Jahr</th>
            <th className="sm:pl-4 py-2">Zins</th>
            <th className="sm:px-4 py-2">Tilgung</th>
            <th className="sm:px-4 py-2">{ screenWidthMobile() ? "Jhl. Rate" : "Jährliche Rate"}</th>
            <th className="sm:px-4 py-2">{ screenWidthMobile() ? "Rest" : "Restschuld" }</th>
            <th className="sm:px-4 py-2">{ screenWidthMobile() ? "S.Tilgung": "Sondertilgung" }</th>
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
                <form onSubmit={(e) => _calcSondertilgung(e, x.year)} className="flex sm:gap-4 justify-fit"> 
                  <button
                    className="hover:cursor-pointer text-gray-800 hover:text-gray-200"
                  >
                  +
                  </button>
                  <input size={3} type="number" name="sonderTilgungAmount" className="text-green-400 rounded-md text-sm p-[3px] active:text-gray-200 w-20" />
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
