import { useNebenkostenActiveStore } from "@/store";

type PropTypes = {
  data: { name: string; value: number }[];
  activeIndex: number | null;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  openModal: (arg1: boolean) => void;
};
export default function NebenkostenGrid({
  data,
  activeIndex,
  handleMouseEnter,
  handleMouseLeave,
  openModal
}: PropTypes) {
  const nebenkostenActive = useNebenkostenActiveStore().value;
  return (
    <div
      onClick={() => openModal(true)}
      className="order-first hidden h-20 w-full flex-col gap-12 pb-4 md:grid md:h-fit md:grid-cols-2 md:gap-2 md:p-0">
      {data.map((entry, index) => (
        <div
          key={entry.name}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          className={`flex cursor-pointer flex-col transition-opacity ${activeIndex === index
            ? "text-[var(--primary)] opacity-100"
            : "opacity-90"
            }`}
        >
          <div className="flex items-center">
            <span
              className="mr-2 inline-block h-3 min-w-3 rounded-sm"
              style={{
                backgroundColor: `var(--${index === 0 ? "dark-accent" : index === 1 ? "neutral-accent" : index === 2 ? "accent" : "light-accent"})`,
              }}
            />
            <div className="inline-block overflow-hidden text-lg overflow-ellipsis md:text-xs">
              {entry.name}:
            </div>
          </div>
          <div className={`${!nebenkostenActive && "line-through text-[var(--grey-accent)]"} text-2xl md:text-lg`}>
            {entry.value.toLocaleString("de")}&nbsp;€
          </div>
        </div>
      ))}
    </div>
  );
}
