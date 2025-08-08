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
    return `${Math.floor(value / 1000)}k`
  }
  return value.toString();
}

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
