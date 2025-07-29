import NumberInput from "app/services/numberFormatter";
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
}) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1 text-xs font-semibold text-stone-400 uppercase"
      >
        {label}
      </label>
      <div className="flex md:w-68 flex-col gap-y-3 md:gap-y-0">
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
          <div className="relative -left-6 text-stone-600">{inputName === "interest_rate" ? "%" : sign}</div>
        </div>
      </div>
    </div>
  );
};

export default SliderInput;
