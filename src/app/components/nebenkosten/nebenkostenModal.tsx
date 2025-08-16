import PieChartNebenkosten from "./pieChartNebenkosten";

const COLORS = [
  "hsl(194, 33%, 22%)",
  "hsl(194, 33%, 18%)",
  "hsl(195, 37%, 40%)",
  "hsl(172, 25%, 55%)",
];

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
    <div className="z-40 mx-auto max-w-md rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--primary)]/50 to-[var(--primary)]/40 shadow-2xl">
      {/* Chart Section */}
      <div className="p-6">
        <PieChartNebenkosten
          data={nebenkosten}
          activeIndex={activeIndex}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </div>

      {/* Cost Breakdown Section */}
      <div className="space-y-4 px-6 pb-6">
        {nebenkosten.map((entry, index) => (
          <div
            key={entry.name}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={`group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-all hover:bg-white/5 ${
              activeIndex === index
                ? "text-[var(--accent)] opacity-100"
                : "opacity-90"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-4 w-4 rounded-sm transition-transform group-hover:scale-110"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <div className="text-lg font-medium md:text-base">
                {entry.name}
              </div>
            </div>
            <div className="text-xl font-semibold md:text-lg">
              €{entry.value.toLocaleString("de")}
            </div>
          </div>
        ))}

        {/* Total Section */}
        <div className="mt-6 border-t border-slate-500/20 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Summe Nebenkosten</h2>
            <p className="text-2xl font-bold text-[var(--accent)]">
              €{sumNebenkosten.toLocaleString("de-DE")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
