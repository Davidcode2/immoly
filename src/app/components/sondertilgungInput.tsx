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
        size={3}
        type="string"
        name="sonderTilgungAmount"
        value={amount!}
        onChange={onChange}
        className={`${amount ? "text-green-400" : "text-gray-800"} w-20 rounded-md p-[3px] text-sm active:text-gray-200`}
      />
      <button
        className={`${valueChanged ? "text-green-600 text-2xl" : "text-gray-800" } hover:cursor-pointer hover:text-gray-200`}
      >
        +
      </button>
    </>
  );
}
