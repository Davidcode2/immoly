import { useEffect, useState } from "react";
import { Slider as ShadcnSlider } from "@/components/ui/slider";

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

  const localChange = (newValue: number) => {
    setInputValue(newValue);
    onChange(inputName, newValue);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const stepChange = (upOrDown: number) => {
    const up = upOrDown === 1;
    const next = up ? inputValue + step : inputValue - step;
    localChange(Math.min(Math.max(next, min), max)); // clamp
  };

  return (
    <div className="mx-0 flex items-center gap-2 w-full">
      {/* Decrement button (mobile only) */}
      <button
        className="rounded-lg border px-2 opacity-50 hover:opacity-100 lg:hidden"
        onClick={() => stepChange(-1)}
        type="button"
      >
        -
      </button>

      {/* Shadcn Slider */}
      <ShadcnSlider
        value={[inputValue]}
        min={min}
        max={max}
        step={step}
        onValueChange={(vals) => localChange(vals[0])}
        className="flex-1"
      />

      {/* Increment button (mobile only) */}
      <button
        className="rounded-lg border px-2 opacity-50 hover:opacity-100 lg:hidden"
        onClick={() => stepChange(1)}
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default Slider;

