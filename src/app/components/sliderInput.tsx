import React, { useState } from "react";
import Slider from "./slider";
import NumberInput from "./numberInputSlider";

type SliderInputProps = {
  min: number;
  max: number;
  step?: number;
  initialValue?: number;
};

const SliderInput: React.FC<SliderInputProps> = ({
  min,
  max,
  step = 1,
  initialValue = min,
}) => {
  const [value, setValue] = useState<number>(initialValue);

  return (
    <div>
      <Slider value={value} min={min} max={max} step={step} onChange={setValue} />
      <NumberInput value={value} min={min} max={max} onChange={setValue} />
    </div>
  );
};

export default SliderInput;

