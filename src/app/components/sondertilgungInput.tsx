import { useEffect, useState } from "react";

type PropTypes = {
  sondertilgung: string;
  year: number;
};

export default function SondertilgungInput({ sondertilgung }: PropTypes) {
  const [amount, setAmount] = useState<string | null>(sondertilgung);

  useEffect(() => {
    setAmount(sondertilgung);
  }, [sondertilgung]);

  return (
    <input
      size={3}
      type="string"
      name="sonderTilgungAmount"
      value={amount!}
      onChange={(e) => setAmount(String(e.target.value))}
      className={`${amount ? "text-green-400" : "text-gray-800"} w-20 rounded-md p-[3px] text-sm active:text-gray-200`}
    />
  );
}
