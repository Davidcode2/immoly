import { useEffect, useRef } from "react";
import { CompleteNebenkostenModel } from "./nebenkostenFrontendModel";

type PropTypes = {
  entry: CompleteNebenkostenModel;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowEditModal: (arg1: boolean) => void;
};

export default function EditNebenkostenInput({
  entry,
  handleChange,
  setShowEditModal,
}: PropTypes) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.select();
    inputRef.current!.focus();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 bg-radial md:w-1/4">
        <label className="self-start text-4xl" htmlFor={entry.name}>
          {entry.name}
        </label>
        <form onSubmit={() => setShowEditModal(false)}>
          <input
            id={entry.name}
            type="number"
            ref={inputRef}
            onChange={handleChange}
            name={entry.name}
            value={Math.round(entry.value) || ""}
            className="focus:bg-[var(--foreground)/20 w-full rounded-full border border-slate-300 bg-[var(--foreground)]/10 px-8 py-1 text-left text-xl text-[var(--text)] outline-none placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] focus:placeholder:text-[var(--text)] md:text-5xl"
          />
        </form>
        <>
          <div className="flex justify-center items-center">
            <input
              value={entry.percentage || ""}
              type="text"
              className="w-22 rounded-full bg-linear-to-br from-[var(--dark-accent)] to-[var(--accent)] p-1 px-4 text-start text-lg text-[var(--secondary)]"
              onChange={(e) =>
                entry.setPercentage(e.target.value)
              }
            />
            <div className="relative right-7">%</div>
          </div>
        </>
      </div>
    </>
  );
}
