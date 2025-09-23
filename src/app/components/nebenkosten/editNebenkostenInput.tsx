import { useEffect, useRef } from "react";
import { NebenkostenObjectModel } from "./nebenkostenFrontendModel";
import { useMaklergebuehrStore } from "app/store";

type PropTypes = {
  entry: NebenkostenObjectModel;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EditNebenkostenInput({
  entry,
  handleChange,
}: PropTypes) {
  const inputRef = useRef<HTMLInputElement>(null);
  const maklergebuehrPercentage = useMaklergebuehrStore((state) => state.value);
  const updateMaklergebuehrPercentage = useMaklergebuehrStore(
    (state) => state.updateValue,
  );

  useEffect(() => {
    inputRef.current!.select();
    inputRef.current!.focus();
  },[]);

  return (
    <>
      <div className="flex bg-radial flex-col items-center justify-center gap-5 md:w-1/4">
        <label className="self-start text-4xl" htmlFor={entry.name}>
          {entry.name}
        </label>
        <input
          id={entry.name}
          type="number"
          ref={inputRef}
          onChange={handleChange}
          name={entry.name}
          value={Math.round(entry.value)}
          className="w-full rounded-full border border-slate-300 bg-[var(--foreground)]/10 px-8 py-1 text-left text-xl text-[var(--text)] outline-none placeholder:text-slate-400 focus:border-[var(--accent)] focus:bg-[var(--foreground)/20 focus:ring-1 focus:ring-[var(--accent)] focus:placeholder:text-[var(--text)] md:text-5xl"
        />
        {entry.name === "Maklergebühr" && (
          <>
            <div className="w-fit rounded-full bg-linear-to-br from-[var(--dark-accent)] to-[var(--accent)] p-1 px-4 text-lg text-[var(--secondary)]">
              {entry.name === "Maklergebühr" && (
                <select
                  value={maklergebuehrPercentage}
                  name="maklergebuehr"
                  onChange={(e) =>
                    updateMaklergebuehrPercentage(Number(e.target.value))
                  }
                >
                  <option value={3.57}>3,57 %</option>
                  <option value={2.98}>2,98 %</option>
                  <option value={3.12}>3,12 %</option>
                </select>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
