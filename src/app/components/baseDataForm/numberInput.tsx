import {
  formatGerman,
  parseDecimal,
} from "app/services/numberFormatService";
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

    // Format the value
    const formatted = formatGerman(unformatted);
    setDisplayValue(formatted);

    // Restore caret position after formatting
    requestAnimationFrame(() => {
      const newLength = formatted.length;
      const diff = newLength - unformatted.length;
      const newPosition = selectionStart + diff;
      input.setSelectionRange(newPosition, newPosition);
    });
    handleChange(e);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="decimal"
      id={id}
      value={displayValue}
      name={inputName}
      onChange={localHandleChange}
      placeholder="Zahl eingeben"
      className="w-36 border-b border-[var(--secondary)] bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-[var(--accent)] focus:outline-none lg:text-base"
    />
  );
}
