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
    const dotsInInput = (input.value.match(/\./g) || []).length;
    console.log(dotsInInput, "dots in input");
    const digitChangedBeforeDot =
      selectionStart < input.value.indexOf("."); 

    // Restore caret position after formatting
    requestAnimationFrame(() => {
      const newLength = formatted.length;
      // user added a digit
      if (prevValue.length < unformatted.length) {
        let newPosition = selectionStart;
        if (selectionStart === input.value.length) {
          newPosition = selectionStart + 1;
        } 
        else if (dotsInInput > 0) {
          if (digitChangedBeforeDot) {
            // handles 1|.357 -> 12|.357
            // but 1.|357 -> 12.|357
            // this means if the input is added before a dot the caret moves one up which is correct
            // if the input is added after a dot the caret also moves one up which is incorrect
            // while this is somewhat fine when the digit is added right after the dot this
            // will become a problem when the digit is added not near a dot
            // 1.35|7 -> 13.567|
          } else {
            console.log("moving caret up by number of dots");
            newPosition = selectionStart + dotsInInput;
          }
        } else {
          console.log("moving caret up one"); 
          newPosition = selectionStart + 1;
        }
        input.setSelectionRange(newPosition, newPosition);
        // user removed a digit
      } else if (prevValue.length > unformatted.length) {
        if (formatted.length === unformatted.length && dotsInInput > 0) {
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
    const formatted = formatGerman(unformatted);
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
