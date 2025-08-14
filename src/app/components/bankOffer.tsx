import Image from "next/image";

type PropTypes = {
  title: string;
  interest: number;
  zinsbindung: number;
  imageSrc: string;
  sondertilgungen?: number;
};
export default function BankOffer({
  title,
  interest,
  zinsbindung,
  imageSrc,
  sondertilgungen,
}: PropTypes) {
  return (
    <div className="flex flex-col gap-4 rounded-lg shadow md:flex-row">
      <div className="relative h-40 md:h-auto md:w-96">
        <Image
          className="w-fit rounded-t-lg object-cover object-center md:rounded-l-lg md:rounded-t-none"
          fill
          src={imageSrc}
          alt="BKB logo"
        />
      </div>
      <div className="h-60 w-full overflow-scroll p-4">
        <div className="pb-4 text-2xl">{title}</div>
        <div className="grid gap-4 md:grid-cols-[repeat(4,180px)]">
          <div className="rounded-lg bg-[var(--secondary)]/50 p-3 shadow">
            <div className="text-xs">Zins</div>
            <div>{interest} %</div>
          </div>
          <div className="rounded-lg bg-[var(--secondary)]/50 p-3 shadow">
            <div className="text-xs">Zinsbindung</div>
            <div>{zinsbindung} Jahre</div>
          </div>
          {sondertilgungen && (
            <div className="rounded-xl bg-[var(--alert)]/50 p-3 shadow">
              <div className="text-xs">Sondertilgung</div>
              <div>{sondertilgungen} %</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
