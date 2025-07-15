import { useState } from "react";
import ArmotizationEntry from "./lib/models/ArmotizationEntry";
import calcSondertilgung from "./lib/sondertilgung";

type PropTypes = {
  table: ArmotizationEntry[];
};
export default function Tilgungstabelle({ table }: PropTypes) {
  const [tilgungsTabelle, setTilgungstabelle] = useState(table);

  const _calcSondertilgung = (remainingPrincipal: number, year: number) => {
    const sondertilgung = getSondertilgungFromUser();
    calcSondertilgung(remainingPrincipal, 1000);
    setTilgungstabelle(recalcTable(year, sondertilgung))
  }

  const getSondertilgungFromUser = () => {
    return 1000;
  }

  const recalcTable = (year: number, sondertilgung: number) => {
    const tableUpToSondertilgung = tilgungsTabelle.filter((x: ArmotizationEntry) => x.year < year);
    const recalculated = tilgungsTabelle.map((x: ArmotizationEntry) => {
      if (x.year === year) {
        const newValue = {
          year: x.year,
          interest: x.interest,
          principal: x.principal,
          yearlyRate: x.yearlyRate,
          remainingPrincipal: x.remainingPrincipal - sondertilgung
        } as ArmotizationEntry
        return newValue;
      }
      return x;
    });
    return recalculated;
  }

  return (
    <div>
      <table className="overflow-auto">
        <thead>
          <tr className="sticky top-0 bg-black">
            <th className="px-4 py-2">Add</th>
            <th className="px-4 py-2">Jahr</th>
            <th className="px-4 py-2">Zins</th>
            <th className="px-4 py-2">Tilgung</th>
            <th className="px-4 py-2">Jährliche Rate</th>
            <th className="px-4 py-2">Restschuld</th>
          </tr>
        </thead>
        <tbody>
          {table.map((x) => (
            <tr
              key={x.year}
              className="even:bg-[#0f0f0f] border-t border-gray-950"
            >
              <td className="px-4 py-2 text-gray-800 hover:text-gray-200" onClick={() => _calcSondertilgung(x.remainingPrincipal)}>+</td>
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
