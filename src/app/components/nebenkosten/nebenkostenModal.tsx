import PieChartNebenkosten from "./pieChartNebenkosten";

type PropTypes = {
  nebenkosten: any;
  sumNebenkosten: number;
  activeIndex: number | null;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
};
export default function NebenkostenModal({
  nebenkosten,
  sumNebenkosten,
  activeIndex,
  handleMouseEnter,
  handleMouseLeave,
}: PropTypes) {
  return (
    <div className="z-40 mx-10 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--primary)]/50 to-[var(--primary)]/40 shadow-2xl sm:mx-0 md:w-[400px]">
      <PieChartNebenkosten
        data={nebenkosten}
        activeIndex={activeIndex}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      {nebenkosten.map((entry: { name: string; value: number }) => (
        <div key={entry.name} className="border-b border-slate-500/20 p-4">
          <h3 className="text-lg font-semibold">{entry.name}</h3>
          <p className="text-sm text-gray-700">
            {entry.value.toLocaleString("de-DE")} EUR
          </p>
        </div>
      ))}
      <div className="p-4">
        <h2 className="text-xl font-bold">Summe Nebenkosten</h2>
        <p className="text-2xl text-gray-600">
          {sumNebenkosten.toLocaleString("de-DE")} EUR
        </p>
      </div>
    </div>
  );
}
