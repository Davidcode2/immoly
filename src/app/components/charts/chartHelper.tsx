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

