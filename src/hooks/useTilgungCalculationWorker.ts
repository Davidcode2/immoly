import ArmotizationEntry from "@/lib/models/ArmotizationEntry";
import { debounce } from "@/utils/debounce";
import { useEffect, useMemo, useRef } from "react";

export default function useTilgungsCalculationWorker(setTable: (table: ArmotizationEntry[]) => void ) {
  const workerRef = useRef<Worker>(null);
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/tilgungCalculation.worker.ts", import.meta.url),
    );
    workerRef.current.onmessage = (e) => {
      setTable(e.data);
    };
    return () => workerRef.current?.terminate();
  }, []);

  const postToWorker = useMemo(
    () =>
      debounce((input, nebenkosten) => {
        workerRef.current?.postMessage({ input, nebenkosten });
      }, 5),
    [],
  );
  return postToWorker;
}
