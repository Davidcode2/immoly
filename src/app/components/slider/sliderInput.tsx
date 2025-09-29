"use client";

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
  handleChange: (name: string, value: number) => void;
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
  children,
}) => {

  const percentageInputs = ["interest_rate", "cash_roi"];

  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={`pb-4 block text-[var(--light-accent)] dark:text-[var(--ultralight-accent)] 2xl:dark:text-[var(--light-accent)] uppercase`}
      >
        {label}
      </label>
      <div className="order-2 flex flex-col gap-y-6 lg:w-68 md:gap-y-4">
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          inputName={inputName}
          onChange={handleChange}
        />
        <div className="order-first flex items-center gap-x-2 sm:order-2">
          <NumberInput
            handleChange={handleChange}
            id={htmlFor}
            inputName={inputName}
            value={value}
          />
          <div className="relative -left-6 text-[var(--foreground)]/80">
            { percentageInputs.includes(inputName) ? "%" : sign}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SliderInput;
