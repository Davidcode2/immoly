import SliderInput from "../slider/sliderInput";

type PropTypes = {
  handleInputChange: (name: string, value: number) => void;
  cashRoi: number | string;
  rent: number | string;
};
export default function OptionalParameters({
  handleInputChange,
  rent,
  cashRoi,
}: PropTypes) {
  return (
    <div className="grid gap-2 md:gap-6">
      <SliderInput
        min={0.0}
        max={10}
        step={0.1}
        value={Number(cashRoi) || 0}
        inputName={"cash_roi"}
        label={"Jährliche Kapitalrendite"}
        htmlFor={"cashRoi"}
        handleChange={handleInputChange}
      />
      <SliderInput
        min={0}
        max={3000}
        step={10}
        value={Number(rent) || 0}
        inputName={"rent"}
        label={"monatliche Kaltmiete"}
        htmlFor={"rent"}
        handleChange={handleInputChange}
      />
    </div>
  );
}
