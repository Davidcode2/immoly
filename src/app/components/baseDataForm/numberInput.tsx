import { formatGerman, parseDecimal } from "app/services/numberFormatService";
import { useEffect, useRef, useState } from "react";

type PropTypes = {
  value?: number;
  id: string;
  inputName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function NumberInput({
  handleChange,
  id,
  inputName,
  value,
}: PropTypes) {
  const [displayValue, setDisplayValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [prevValue, setPrevValue] = useState<string>("");
  const [prevNumberOfDots, setPrevNumberOfDots] = useState<number>(0);

  useEffect(() => {
    if (value !== undefined) {
      const formattedValue = formatGerman(String(value));
      if (inputName === "interest_rate") {
        // Special handling for interest_rate input
        const interestRate = parseDecimal(String(value));
        setDisplayValue(interestRate.toFixed(2).replace(".", ","));
      } else {
        setDisplayValue(formattedValue);
        if (inputRef.current) {
          inputRef.current.value = formattedValue;
        }
      }
    }
  }, [value]);

  const localHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selectionStart = input.selectionStart ?? 0;
    const unformatted = input.value.replace(/\./g, "");
    const formatted = formatGerman(unformatted);
    const dotsInFormattedInput = (formatted.match(/\./g) || []).length;
    console.log(
      "Formatted Input: ",
      formatted,
      "Dots in formatted input: ",
      dotsInFormattedInput,
    );
    setPrevNumberOfDots(dotsInFormattedInput);
    const digitChangedBeforeDot = selectionStart < input.value.indexOf(".");

    // Restore caret position after formatting
    requestAnimationFrame(() => {
      const newLength = formatted.length;
      if (prevValue.length < unformatted.length) {
        // user added a digit
        let newPosition = selectionStart;
        if (prevNumberOfDots < dotsInFormattedInput) {
          // dot was added when formatting value
          newPosition = selectionStart + 1;
        }
        input.setSelectionRange(newPosition, newPosition);
      } else if (prevValue.length > unformatted.length) {
        // user removed a digit
        if (
          formatted.length === unformatted.length &&
          dotsInFormattedInput > 0
        ) {
          // handles 1.234 -> 124
          input.setSelectionRange(selectionStart - 1, selectionStart - 1);
        } else {
          console.log(formatted.length, formatted);
          console.log(unformatted.length, unformatted);
          const diff = newLength - unformatted.length;
          const newPosition = selectionStart + diff;
          console.log("Setting selection Start:", selectionStart);
          input.setSelectionRange(newPosition - diff, newPosition - diff);
        }
      }
    });

    // Format the value
    setDisplayValue(formatted);
    //handleChange(e);
    setPrevValue(unformatted);
  };

  /*
  12
  123
  1234 => 1.234
  */

  /*
   * 1.23|4
   * 1.2|4 => 124|
   */

  return (
    <input
      ref={inputRef}
      type="text"
      id={id}
      value={displayValue}
      name={inputName}
      onChange={localHandleChange}
      placeholder="Zahl eingeben"
      className="w-36 border-b border-[var(--secondary)] bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-[var(--accent)] focus:outline-none lg:text-base"
    />
  );
}
