import { useEffect, useState } from "react";
import "./slider.css";

type SliderProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  inputName: string;
  onChange: (name: string, value: number) => void;
};

const Slider: React.FC<SliderProps> = ({
  value,
  min,
  max,
  step = 1,
  inputName,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    localChange(newValue, e.target.name);
  };

  const localChange = (newValue: number, inputName: string) => {
    setInputValue(newValue);
    onChange(inputName, newValue);
  };

  useEffect(() => {
    const debouncedChange = setTimeout(() => {
      setInputValue(value);
    }, 30);
    return () => {
      clearTimeout(debouncedChange);
    };
  }, [value]);

  const stepChange = (upOrDown: number) => {
    const up = upOrDown === 1;
    if (up) {
      localChange(inputValue + step, inputName);
    } else {
      localChange(inputValue - step, inputName);
    }
  };

  return (
    <div className="sm:mx-0 -mx-5 flex">
      <button
        className="rounded-lg border-[var(--accent)] px-2 opacity-50 hover:border hover:opacity-100 lg:hidden"
        onClick={() => stepChange(-1)}
        type="button"
      >
        -
      </button>
      <input
        type="range"
        value={inputValue}
        min={min}
        max={max}
        step={step}
        onChange={handleInputChange}
        name={inputName}
        className="mt-1"
      />
      <button
        className="rounded-lg border-[var(--accent)] px-2 opacity-50 hover:border hover:opacity-100 lg:hidden"
        onClick={() => stepChange(1)}
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default Slider;
