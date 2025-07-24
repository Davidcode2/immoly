import { useEffect, useState } from "react";

type PropTypes = {
  sondertilgung: number;
  year: number;
};

export default function SondertilgungInput({ sondertilgung }: PropTypes) {
  const [amount, setAmount] = useState<number | null>(sondertilgung);

  useEffect(() => {
    setAmount(sondertilgung);
  }, [sondertilgung]);

  return (
    <input
      size={3}
      type="number"
      name="sonderTilgungAmount"
      value={amount!}
      onChange={(e) => setAmount(Number(e.target.value))}
      className={`${amount ? "text-green-400" : "text-gray-800"} w-20 rounded-md p-[3px] text-sm active:text-gray-200`}
    />
  );
}
