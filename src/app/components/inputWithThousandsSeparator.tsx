import {
  calcCursorPosition,
  formatGerman,
} from "app/services/numberFormatService";
import { useEffect, useRef, useState } from "react";

export default function InputWithThousandsSeparator({
  value,
  className,
  inputName,
}: {
  value: number;
  className: string;
  inputName: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [prevValue, setPrevValue] = useState<string>("");
  const [prevNumberOfDots, setPrevNumberOfDots] = useState<number>(0);

  useEffect(() => {
    inputRef.current!.select();
    inputRef.current!.focus();
  }, []);

  useEffect(() => {
    if (value !== undefined) {
      const formattedValue = formatGerman(String(value));
      setDisplayValue(formattedValue);
      if (inputRef.current) {
        inputRef.current.value = formattedValue;
      }
    }
  }, [value]);

  const localHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selectionStart = input.selectionStart ?? 0;
    const unformatted = input.value.replace(/\./g, "");

    const isValid = validationPattern().test(unformatted);
    if (!isValid) {
      return;
    }

    const formatted = formatGerman(unformatted);
    const dotsInFormattedInput = (formatted.match(/\./g) || []).length;
    setPrevNumberOfDots(dotsInFormattedInput);

    // Restore caret position after formatting
    requestAnimationFrame(() => {
      const newPosition = calcCursorPosition(
        selectionStart,
        unformatted,
        dotsInFormattedInput,
        prevValue,
        prevNumberOfDots,
      );
      input.setSelectionRange(newPosition, newPosition);
    });

    setDisplayValue(formatted);
    setPrevValue(unformatted);
    //handleSubmit(parseDecimal(unformatted) || 0, year);
  };
  const validationPattern = () => {
    return /^[0-9]{0,5}$/;
  };

  return (
    <input
      ref={inputRef}
      className={className}
      onChange={localHandleChange}
      id={inputName}
      name={inputName}
      type="text"
      inputMode="numeric"
      min={0}
      max={50000}
      maxLength={7}
      value={displayValue}
    />
  );
}
