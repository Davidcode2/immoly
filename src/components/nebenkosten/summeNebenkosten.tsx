import { useRef, useState } from "react";
import InputWithThousandsSeparator from "../inputWithThousandsSeparator";
import {
  useNotarkostenPercentageStore,
} from "@/store";
import { Check } from "lucide-react";
import { useCalcNebenkostenSum } from "@/hooks/useCalcNebenkostenSum";

type PropTypes = {
  sumNebenkosten: number;
  nebenkostenActive: boolean;
  principal: number;
};
export default function SummeNebenkosten({
  sumNebenkosten,
  nebenkostenActive,
  principal,
}: PropTypes) {
  const [edit, setEdit] = useState(false);
  const localSum = useRef(sumNebenkosten);
  const updateNotarkostenPercentageState =
    useNotarkostenPercentageStore().updateValue;

  const notarkostenPercentage = Number(
    useNotarkostenPercentageStore((state) => state.value).replace(",", "."),
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    parsedValue: number,
  ) => {
    localSum.current = parsedValue;
    console.log(parsedValue);
  };

  const handleSubmit = () => {
    const currentNotarkostenAbsolute =
      (Number(notarkostenPercentage) / 100) * principal;
    const differenceOldAndNewTotalSum = localSum.current - sumNebenkosten;
    const differenceToNotarkosten =
      currentNotarkostenAbsolute + differenceOldAndNewTotalSum;

    const newPercent = ((differenceToNotarkosten / principal) * 100)
      .toFixed(10)
      .replace(".", ",");

    console.log(newPercent);
    updateNotarkostenPercentageState(newPercent);
    setEdit(false);
  };

  localSum.current = useCalcNebenkostenSum(principal);

  return (
    <div className="flex items-center justify-between gap-x-8">
      <label
        htmlFor="sumNebenkosten"
        className={`${!nebenkostenActive && "line-through"} text-lg`}
        onClick={() => setEdit(true)}
      >
        Summe Nebenkosten
      </label>
      {edit ? (
        <form className="flex items-center text-2xl">
          <InputWithThousandsSeparator
            value={localSum.current}
            className="w-26 bg-transparent text-end text-2xl transition-colors duration-200 focus:outline-none"
            inputName="sumNebenkosten"
            handleChange={handleChange}
            maxLength={7}
          />
          &nbsp;
          <button className="hover:cursor-pointer" onClick={handleSubmit}>
            <Check className="text-green" color={"var(--success)"} size={18} />
          </button>
        </form>
      ) : (
        <p
          className="w-32 text-end text-2xl dark:text-[var(--ultralight-accent)]"
          onClick={() => setEdit(true)}
        >
          {sumNebenkosten.toLocaleString("de-DE")}&nbsp;€
        </p>
      )}
    </div>
  );
}
