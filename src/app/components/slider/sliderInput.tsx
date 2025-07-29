import Slider from "./slider";

type SliderInputProps = {
  min: number;
  max: number;
  step?: number;
  value?: number;
  label: string;
  inputName: string;
  htmlFor: string;
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
      <div className="flex flex-col gap-y-3 md:gap-y-0">
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          inputName={inputName}
          onChange={handleChange}
        />
        <input
          type="number"
          className="w-36 md:w-auto border-b border-stone-700 bg-transparent pb-1 text-xl transition-colors duration-200 focus:border-slate-500 focus:outline-none md:text-base"
          id={htmlFor}
          name={inputName}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SliderInput;
