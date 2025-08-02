import NumberInput from "app/components/baseDataForm/numberInput";
import Slider from "./slider";

type SliderInputProps = {
  min: number;
  max: number;
  step?: number;
  value?: number;
  label: string;
  inputName: string;
  htmlFor: string;
  sign?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
};

const SliderInput: React.FC<SliderInputProps> = ({
  min,
  max,
  step = 1000,
  value = min,
  label,
  inputName,
  htmlFor,
  sign = "€",
  handleChange,
  children
}) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1 text-xs font-semibold text-stone-400 uppercase"
      >
        {label}
      </label>
      <div className="flex flex-col gap-y-3 md:w-68 md:gap-y-4">
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          inputName={inputName}
          onChange={handleChange}
        />
        <div className="flex items-center gap-x-2">
          <NumberInput
            handleChange={handleChange}
            id={htmlFor}
            inputName={inputName}
            value={value}
          />
          <div className="relative -left-6 text-stone-600">
            {inputName === "interest_rate" ? "%" : sign}
          </div>
          { children }
        </div>
      </div>
    </div>
  );
};

export default SliderInput;
