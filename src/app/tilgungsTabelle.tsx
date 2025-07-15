import { FormEvent, useEffect, useState } from "react";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import calcSondertilgung from "./lib/sondertilgung";
import calcTilgung from "./lib/calculateArmotizaztionTable";
import Form from "next/form";

type PropTypes = {
  table: ArmotizationEntry[];
};

export default function Tilgungstabelle({ table }: PropTypes) {
  useEffect(() => {
    setTilgungstabelle(table);
  }, [table]);

  const [tilgungsTabelle, setTilgungstabelle] = useState(table);

  const _calcSondertilgung = (event: any, remainingPrincipal: number, year: number) => {
    event.preventDefault();
    const sondertilgungAmount = event.target.elements.sonderTilgungAmount.value;
    calcSondertilgung(remainingPrincipal, 1000);
    const newTable = recalcTable(year, sondertilgungAmount);
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
      interest_rate: 3,
      monthly_rate: impactedEntry.yearlyRate / 12,
      rent: 1000,
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

  return (
    <div>
      <table className="overflow-auto">
        <thead>
          <tr className="sticky top-0 bg-black">
            <th className="px-4 py-2">Sondertilgung</th>
            <th className="px-4 py-2">Jahr</th>
            <th className="px-4 py-2">Zins</th>
            <th className="px-4 py-2">Tilgung</th>
            <th className="px-4 py-2">Jährliche Rate</th>
            <th className="px-4 py-2">Restschuld</th>
          </tr>
        </thead>
        <tbody>
          {tilgungsTabelle.map((x) => (
            <tr
              key={x.year}
              className="even:bg-[#0f0f0f] border-t border-gray-950"
            >
              <td className="px-4 py-2 ">
                <form onSubmit={(e) => _calcSondertilgung(e, x.remainingPrincipal, x.year)} className="flex gap-4"> 
                  <button
                    className="hover:cursor-pointer text-gray-800 hover:text-gray-200"
                  >
                  +
                  </button>
                  <input type="number" name="sonderTilgungAmount" className="text-green-400 rounded-md text-sm p-[3px] active:text-gray-200 w-20" />
                </form>
              </td>
              <td className="px-4 py-2">{x.year}</td>
              <td className="px-4 py-2">
                {Math.round(x.interest).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                {Math.round(x.principal).toLocaleString()}
              </td>
              <td className="px-4 py-2">{x.yearlyRate.toLocaleString()}</td>
              <td className="px-4 py-2">
                {Math.round(x.remainingPrincipal).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
