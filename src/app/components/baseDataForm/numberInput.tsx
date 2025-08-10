import { calcCursorPosition, formatGerman, parseDecimal } from "app/services/numberFormatService";
import { useEffect, useRef, useState } from "react";

type PropTypes = {
  value?: number;
  id: string;
  inputName: string;
  handleChange: (name: string, value: number) => void;
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
    setPrevNumberOfDots(dotsInFormattedInput);

    // Restore caret position after formatting
    requestAnimationFrame(() => {
      const newPosition = calcCursorPosition(selectionStart, unformatted, dotsInFormattedInput, prevValue, prevNumberOfDots)
      input.setSelectionRange(newPosition, newPosition);
    });

    setDisplayValue(formatted);
    setPrevValue(unformatted);
    handleChange(e.target.name, parseDecimal(unformatted) || 0);
  };

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
