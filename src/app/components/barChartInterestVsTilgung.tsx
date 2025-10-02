import { motion } from "motion/react";

type PropTypes = {
  sumZinsen: number;
  kreditSumme: number;
  show?: boolean;
};

export default function BarChartInterestVsTilgung({
  sumZinsen,
  kreditSumme,
  show = true,
}: PropTypes) {
  if (!show || sumZinsen === 0 || kreditSumme === 0) {
    return <div />;
  }

  const barWidthInPixels = 180;
  const totalSum = kreditSumme + sumZinsen;

  const calcZinsenBarWidth = () => {
    const width = (barWidthInPixels / totalSum) * sumZinsen;
    return `${width}px`;
  };

  const initialWidth = calcZinsenBarWidth();

  return (
    <div
      className={`h-3 w-[${barWidthInPixels}px] rotate-180 rounded-full bg-[var(--dark-accent)]`}
    >
      <motion.div
        initial={{ width: initialWidth }}
        animate={{ width: calcZinsenBarWidth() }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        className={`absolute h-3 rounded-l-full bg-[var(--primary)]`}
      />
    </div>
  );
}
