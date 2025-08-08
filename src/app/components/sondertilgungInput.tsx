import { useEffect, useState } from "react";

type PropTypes = {
  sondertilgung: string;
  year: number;
};

export default function SondertilgungInput({ sondertilgung }: PropTypes) {
  const [amount, setAmount] = useState<string | null>(sondertilgung);
  const [valueChanged, setValueChanged] = useState<boolean>(false);

  useEffect(() => {
    setAmount(sondertilgung);
    setValueChanged(hasValueChanged(sondertilgung));
  }, [sondertilgung]);

  const hasValueChanged = (newValue: string) => {
    if (newValue != amount) {
      return true;
    }
    const newValueNumber = Number(newValue);
    const res = Number(amount) != newValueNumber;
    if (newValueNumber <= 0) {
      return false;
    }
    console.log(res);
    return res;
  };

  useEffect(() => {
    setValueChanged(hasValueChanged(sondertilgung));
  }, [amount])

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const onChange = (e: any) => {
    const newAmount = e.target.value;
    setAmount(String(newAmount));
  };

  return (
    <>
      <input
        size={4}
        type="string"
        name="sonderTilgungAmount"
        value={amount!}
        onChange={onChange}
        className={`${amount ? "text-[var(--success)]" : "text-gray-800"} md:w-20 p-[3px] text-xs md:text-sm active:text-gray-200 sondertilgungInput border-b border-[var(--secondary)] pb-1 text-xl transition-colors duration-200 focus:border-[var(--accent)] focus:outline-none lg:text-base`}
      />
      <button
        className={`${valueChanged ? "text-[var(--success)] text-2xl" : "text-gray-800" } hover:cursor-pointer hover:text-gray-200`}
      >
        +
      </button>
    </>
  );
}
