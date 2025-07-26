import React, { useEffect, useState } from "react";

type NumberInputProps = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  min,
  max,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parsed = Number(newValue);
    if (newValue === "") return; // don't propagate empty
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      onChange(parsed);
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default NumberInput;
