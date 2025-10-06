import Image from "next/image";
import CloseButton from "./closeButton";

type PropTypes = {
  principal: number;
  nebenkosten: number;
  downPayment: number;
  kreditSummeString: string;
  onClose: () => void;
};
export default function KreditSummeModal({
  principal,
  nebenkosten,
  downPayment,
  kreditSummeString,
  onClose,
}: PropTypes) {
  const sumTotal = principal + nebenkosten;
  const percentageNebenkosten = (
    Math.round((nebenkosten / principal) * 10000) / 100
  ).toLocaleString("de");

  const eigenkapitalPercentage = (
    Math.round((downPayment / principal) * 10000) / 100
  ).toLocaleString("de");

  return (
    <div className="z-40 mx-4 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--background)]/50 to-[var(--primary)]/20 p-10 pt-14 shadow-2xl backdrop-blur-3xl md:mx-auto md:max-w-3xl md:backdrop-blur-xl lg:p-20">
      <CloseButton onClick={onClose} />
      <div className="grid h-fit grid-cols-[1fr_2fr] items-baseline gap-x-2 gap-y-4">
        <span className="text-[var(--dark-accent)]/90 dark:text-[var(--ultralight-accent)]/90">
          Kaufpreis
        </span>
        <span className="text-end text-2xl">
          {principal.toLocaleString("de")}&nbsp;€
        </span>
        <span className="text-[var(--dark-accent)]/90 dark:text-[var(--ultralight-accent)]/90">
          Nebenkosten
        </span>
        <div className="flex w-fit flex-col gap-x-4 justify-self-end border-b pb-4 text-end text-2xl text-[var(--dark-accent)]/90 dark:text-[var(--accent)]/90">
          <div>+&nbsp;{nebenkosten.toLocaleString("de")}&nbsp;€</div>
          <div className="ml-auto w-fit rounded-xl bg-[var(--dark-accent)] p-1 px-2 text-xs text-[var(--secondary)]">
            {percentageNebenkosten}&nbsp;%
          </div>
        </div>
        <span className="max-sm:text-lg text-xl font-normal self-center text-[var(--dark-accent)]/90 dark:text-[var(--ultralight-accent)]/90">
          Gesamtkosten
        </span>
        <div className="text-end text-3xl lg:text-4xl">
          {sumTotal.toLocaleString("de")}&nbsp;€
        </div>
        <span className="group relative flex items-center gap-x-2 text-start text-[var(--dark-accent)]/90 dark:text-[var(--ultralight-accent)]/90">
          Eigenkapital
          {nebenkosten > downPayment && (
            <>
              <Image
                className="absolute left-18 md:static"
                src="/images/icons/icons8-warnung-emoji-48.png"
                alt="yellow warning icon with exclamation point"
                width={16}
                height={16}
              />
              <span className="invisible absolute left-32 w-60 rounded-lg bg-white p-4 text-[var(--accent)] shadow-lg group-hover:visible dark:bg-black">
                Eigenkapital deckt Nebenkosten nicht.
                <br />
                Könnte schwierig werden.
              </span>
            </>
          )}
        </span>
        <span
          className={`flex w-fit flex-col gap-x-4 justify-self-end border-b pb-4 text-end text-2xl text-[var(--strong-accent)]`}
        >
          <div>-&nbsp;{downPayment.toLocaleString("de")}&nbsp;€</div>
          <div className="ml-auto w-fit rounded-xl bg-[var(--dark-accent)] p-1 px-2 text-xs text-[var(--secondary)]">
            {eigenkapitalPercentage}&nbsp;%
          </div>
        </span>
        <h2 className="max-sm:text-lg text-xl font-normal">Kreditsumme</h2>
        <div className="text-end text-3xl lg:text-4xl">{kreditSummeString}&nbsp;€</div>
      </div>
    </div>
  );
}
