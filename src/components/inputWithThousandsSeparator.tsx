import {
  calcCursorPosition,
  formatGerman,
  parseDecimal,
} from "@/services/numberFormatService";
import { useEffect, useRef, useState } from "react";

type PropTypes = {
  value: number;
  className: string;
  inputName: string;
  min?: number;
  max?: number;
  maxLength?: number;
  handleChange?: (
    arg1: React.ChangeEvent<HTMLInputElement>,
    arg2: number,
  ) => void;
};
export default function InputWithThousandsSeparator({
  value,
  className,
  inputName,
  min,
  max,
  maxLength = 10,
  handleChange,
}: PropTypes) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [prevValue, setPrevValue] = useState<string>("");
  const [prevNumberOfDots, setPrevNumberOfDots] = useState<number>(0);
  const valueRef = useRef<string>(formatGerman(String(value)));

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
    console.log("localhandlechange", unformatted);

    const isValid = validationPattern().test(unformatted);
    console.log(isValid);
    console.log(maxLength);
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
    if (handleChange) {
      handleChange(e, parseDecimal(unformatted) || 0);
    }
  };
  const validationPattern = () => {
    return new RegExp(`^[0-9]{0,${maxLength}}$`);
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
      placeholder={valueRef.current}
      min={min || 0}
      max={max || 1000000}
      maxLength={maxLength || 10}
      value={displayValue}
    />
  );
}
