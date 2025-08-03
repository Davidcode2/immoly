/* eslint-disable  @typescript-eslint/no-explicit-any */
export const renderThousandIndicator = ({ x, y, payload }: any) => {
  const formattedValue =
    payload.value >= 1000
      ? `${Math.floor(payload.value / 1000)}k`
      : payload.value.toString();
  return (
    <text x={x} y={y} dy={16} textAnchor="end" fill="#666">
      {formattedValue}
    </text>
  );
};


/* eslint-disable  @typescript-eslint/no-explicit-any */
export const customToolTip = ({ payload, label, active }: any) => {
  if (active) {
    return (
      <div className="dark:bg-black/95 bg-white/95 shadow-lg p-2 rounded-md">
        <p>{`Jahr: ${label}`}</p>
        <p>{`${payload[0].dataKey}: `}<span className="text-yellow-300">{`${payload[0].value.toLocaleString("de-DE")}`}</span></p>
        <p>{`${payload[1].dataKey}: `}<span className="text-green-400">{`${payload[1].value.toLocaleString("de-DE")}`}</span></p>

      </div>
    );
  }

  return null;
}
