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
  setNebenkostenActive: (arg1: boolean) => void;
};
export default function SummeNebenkosten({
  sumNebenkosten,
  nebenkostenActive,
  principal,
  setNebenkostenActive,
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
  };

  const actualSumNebenkosten = useCalcNebenkostenSum(principal, true);

  const activateOrDeactivateNebenkostenState = () => {
    if (localSum.current === 0) {
      setNebenkostenActive(false);
      setEdit(false);
      return;
    } else if (sumNebenkosten === 0) {
      setNebenkostenActive(true);
      return true;
    }
    return false;
  }

  const handleSubmit = () => {
    const activate = activateOrDeactivateNebenkostenState();
    if (activate) {
      sumNebenkosten = actualSumNebenkosten; 
    }
    const differenceOldAndNewTotalSum = localSum.current - sumNebenkosten;
    const currentNotarkostenAbsolute =
      (Number(notarkostenPercentage) / 100) * principal;
    const differenceToNotarkosten =
      currentNotarkostenAbsolute + differenceOldAndNewTotalSum;

    const newPercent = ((differenceToNotarkosten / principal) * 100)
      .toFixed(10)
      .replace(".", ",");

    updateNotarkostenPercentageState(newPercent);
    setEdit(false);
  };

  localSum.current = useCalcNebenkostenSum(principal);

  return (
    <div className="md:flex md:items-center md:justify-between md:gap-x-8 max-md:flex max-md:w-full max-md:flex-col max-md:justify-center max-md:text-center ">
      <label
        htmlFor="sumNebenkosten"
        className={`${!nebenkostenActive && "line-through"} text-lg`}
        onClick={() => setEdit(true)}
      >
        <><span>Summe</span> <span className="max-md:hidden">Nebenkosten</span></>
      </label>
      {edit ? (
        <form className="flex max-sm:w-full justify-center items-center text-center text-2xl">
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
          className="md:w-32 md:text-end text-2xl dark:text-[var(--ultralight-accent)]"
          onClick={() => setEdit(true)}
        >
          {sumNebenkosten.toLocaleString("de-DE")}&nbsp;€
        </p>
      )}
    </div>
  );
}
