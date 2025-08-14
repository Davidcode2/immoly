import Image from "next/image";

type PropTypes = {
  title: string;
  interest: number;
  zinsbindung: number;
  imageSrc: string
  sondertilgungen?: number
};
export default function BankOffer({ title, interest, zinsbindung, imageSrc, sondertilgungen }: PropTypes) {
  return (
    <div className="flex gap-4 rounded-lg shadow">
      <Image
        className="rounded-l-lg"
        src={imageSrc}
        height="80"
        width="228"
        alt="BKB logo"
      />
      <div className="p-4 h-60 w-full overflow-scroll">
        <div className="pb-4 text-2xl">{title}</div>
        <div className="grid md:grid-cols-[repeat(4,180px)] gap-4">
          <div className="rounded-lg bg-[var(--secondary)]/50 p-3 shadow">
            <div className="text-xs">Zins</div>
            <div>{interest} %</div>
          </div>
          <div className="rounded-lg bg-[var(--secondary)]/50 p-3 shadow">
            <div className="text-xs">Zinsbindung</div>
            <div>{zinsbindung} Jahre</div>
          </div>
          { sondertilgungen && 
          <div className="rounded-xl bg-[var(--alert)]/50 p-3 shadow">
            <div className="text-xs">Sondertilgung</div>
            <div>{sondertilgungen} %</div>
          </div>
          }
        </div>
      </div>
    </div>
  );
}
