import { useEffect, useState } from "react";

type PropTypes = {
  sondertilgung: string;
  year: number;
  onChange: (amount: number, year: number) => Promise<void>;
};

export default function SondertilgungInput({
  sondertilgung,
  year,
  onChange,
}: PropTypes) {
  const [amount, setAmount] = useState<string | null>(sondertilgung);

  useEffect(() => {
    setAmount(sondertilgung);
  }, [sondertilgung]);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const localHandelChange = async (e: any) => {
    setAmount(String(e.target.value));
    await onChange(Number(amount), year);
  };

  return (
    <input
      size={3}
      type="string"
      name="sonderTilgungAmount"
      value={amount!}
      onChange={localHandelChange}
      className={`${amount ? "text-green-400" : "text-gray-800"} w-20 rounded-md p-[3px] text-sm active:text-gray-200`}
    />
  );
}
