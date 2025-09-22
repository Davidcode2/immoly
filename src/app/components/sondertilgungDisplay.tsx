type PropTypes = {
  sondertilgung: string;
  year: number;
};

export default function SondertilgungDisplay({ sondertilgung }: PropTypes) {

  return (
    <div className="group">
      <div
        className={`${sondertilgung ? "text-[var(--success)]" : "text-gray-800"} sondertilgungInput rounded-2xl p-[3px] px-2 pb-1 text-end text-xs transition-colors duration-200 group-hover:bg-[var(--muted)] focus:outline-none active:text-gray-200 md:w-20 md:text-sm lg:text-base`}
      >
        {sondertilgung}
        <button
          className={`${sondertilgung ? "hidden" : "block"} ml-auto text-lg text-[var(--foreground)] group-hover:text-[var(--success)] hover:cursor-pointer`}
        >
          +
        </button>
      </div>
    </div>
  );
}
