/* eslint-disable  @typescript-eslint/no-explicit-any */
export const renderThousandIndicator = ({ x, y, payload, labelColor }: any) => {
  const formattedValue = formatNumber(payload.value);
  return (
    <text x={x} y={y} dy={10} textAnchor="end" fill={labelColor} fontSize="12">
      {formattedValue}
    </text>
  );
};

const formatNumber = (value: number) => {
  if (Math.abs(value) >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1000) {
    return `${Math.floor(value / 1000)}k`;
  }
  return value.toString();
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const customToolTip = ({ payload, label, active }: any) => {
  if (active) {
    if (!payload || payload.length < 2) return <div>Fehler, bitte neu laden</div>;
    return (
      <div className="rounded-md bg-white/95 p-2 shadow-lg dark:bg-black/95">
        <p className="text-sm opacity-80">{`Jahr: ${label}`}</p>
        <p>
          <span className="text-sm opacity-80">{`${payload[0].dataKey}: `}</span>
          <span className="text-[var(--light-accent)]">{`${payload[0].value.toLocaleString("de-DE")}`}</span>
        </p>
        <p>
          <span className="text-sm opacity-80">{`${payload[1].dataKey}: `}</span>
          <span className="text-[var(--accent)]">{`${payload[1].value.toLocaleString("de-DE")}`}</span>
        </p>
      </div>
    );
  }

  return null;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex gap-x-4 text-xl">
      {payload.map((entry: any, index: number) => (
        <li
          className={`${entry.value === "Tilgung" ? "text-[var(--dark-accent)]" : "text-[var(--light-accent)]"}`}
          key={`item-${index}`}
        >
          &mdash; {entry.value}
        </li>
      ))}
    </ul>
  );
};
