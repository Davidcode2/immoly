import { useEffect, useState } from "react";
import './slider.css';

type SliderProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Slider: React.FC<SliderProps> = ({ value, min, max, step = 1, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const localChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setInputValue(newValue);
    console.log(e);
    onChange(e);
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
      name="down_payment"
      className="bg-purple-600"
    />
  );
};

export default Slider;

