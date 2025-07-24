type SliderProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({ value, min, max, step = 1, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={handleChange}
    />
  );
};

export default Slider;

