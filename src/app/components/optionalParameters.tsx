type PropTypes = {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
      <div className="grid">
        <label
          htmlFor="cashRoi"
          className="mb-1 text-xs font-semibold text-stone-400 uppercase"
        >
          Kapitalrendite{" "}
          <span className="text-xs font-normal text-gray-400 normal-case">
            (optional)
          </span>
        </label>
        <input
          type="number"
          step="0.1"
          className="border-b border-stone-700 bg-transparent pb-1 transition-colors duration-200 focus:border-slate-500 focus:outline-none"
          id="cashRoi"
          name="cashRoi"
          max="20"
          min="0.0"
          maxLength={2}
          value={cashRoi}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4 grid">
        <label
          htmlFor="rent"
          className="mb-1 text-xs font-semibold text-stone-400 uppercase"
        >
          Miete{" "}
          <span className="text-xs font-normal text-gray-400 normal-case">
            (optional)
          </span>
        </label>
        <input
          type="number"
          className="border-b border-stone-700 bg-transparent pb-1 transition-colors duration-200 focus:border-slate-500 focus:outline-none"
          id="rent"
          name="rent"
          value={rent}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
