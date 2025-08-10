import { useEffect, useState } from "react";
import './slider.css';

type SliderProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  inputName: string,
  onChange: (name: string, value: string) => void;
};

const Slider: React.FC<SliderProps> = ({ value, min, max, step = 1, inputName, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const localChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setInputValue(newValue);
    onChange(e.target.name, e.target.value);
  }

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <input
      type="range"
      value={inputValue}
      min={min}
      max={max}
      step={step}
      onChange={localChange}
      name={inputName}
      className="mt-1"
    />
  );
};

export default Slider;

