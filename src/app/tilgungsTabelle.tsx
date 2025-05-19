type PropTypes = {
  table: {
    year: number;
    interest: number;
    principal: number;
    yearlyRate: number;
    remainingPrincipal: number;
  }[];
};
export default function Tilgungstabelle({ table }: PropTypes) {

  return (
    <div>
      <table className="overflow-auto">
        <thead>
          <tr className="sticky top-0 bg-black">
            <th className="px-4 py-2">Jahr</th>
            <th className="px-4 py-2">Zins</th>
            <th className="px-4 py-2">Tilgung</th>
            <th className="px-4 py-2">Jährliche Rate</th>
            <th className="px-4 py-2">Restschuld</th>
          </tr>
        </thead>
        <tbody>
          {table.map(x => (
            <tr key={x.year} className="even:bg-[#0f0f0f] border-t border-gray-950">
              <td className="px-4 py-2">{x.year}</td>
              <td className="px-4 py-2">{Math.round(x.interest).toLocaleString()}</td>
              <td className="px-4 py-2">{Math.round(x.principal).toLocaleString()}</td>
              <td className="px-4 py-2">{x.yearlyRate.toLocaleString()}</td>
              <td className="px-4 py-2">{Math.round(x.remainingPrincipal).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
