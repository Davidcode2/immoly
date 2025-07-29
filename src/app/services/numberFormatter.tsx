import { useEffect, useRef, useState } from "react";

function formatGerman(value: string): string {
  if (!value) return "";

  // Remove all non-digit and non-comma characters
  const sanitized = value.replace(/\./g, "").replace(",", ".");

  const number = Number(sanitized);
  if (isNaN(number)) return "";

  return new Intl.NumberFormat("de-DE").format(number);
}

function parseGerman(value: string): number {
  return Number(value.replace(/\./g, "").replace(",", "."));
}

function parseDecimal(value: string) {
  return parseFloat(value.replace(",", "."));
}

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
  const [displayValue, setDisplayValue] = useState<string>();
  const [rawValue, setRawValue] = useState(value);
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
        setRawValue(value);
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

    // Update raw value
    const numericValue = parseGerman(unformatted);
    setRawValue(numericValue);

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
      className="w-36 border-b border-stone-700 bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-slate-500 focus:outline-none md:w-auto md:text-base"
    />
  );
}
