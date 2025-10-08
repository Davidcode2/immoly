import { getGrundsteuer } from "@/services/nebenkostenGrundsteuer";
import {
  useBundeslandStore,
  useGrundbuchkostenPercentageStore,
  useMaklergebuehrPercentageStore,
  useNebenkostenActiveStore,
  useNotarkostenPercentageStore,
} from "@/store";

export function useCalcNebenkostenSum(principal: number) {
  const nebenkostenActive = useNebenkostenActiveStore().value;
  const bundesland = useBundeslandStore((state) => state.value);
  const maklergebuehrPercentage = Number(
    useMaklergebuehrPercentageStore((s) => s.value).replace(",", "."),
  );
  const notarkostenPercentage = Number(
    useNotarkostenPercentageStore((s) => s.value).replace(",", "."),
  );
  const grundbuchkostenPercentage = Number(
    useGrundbuchkostenPercentageStore((s) => s.value).replace(",", "."),
  );

  if (!nebenkostenActive) return 0;

  return calcSummeNebenkosten(
    principal,
    bundesland,
    maklergebuehrPercentage,
    notarkostenPercentage,
    grundbuchkostenPercentage,
  );
}

const calcSummeNebenkosten = (
  principal: number,
  bundesland: string,
  maklergebuehrPercentage: number,
  notarkostenPercentage: number,
  grundbuchkostenPercentage: number,
) => {
  const absoluteMaklergebuehrFromPercentage = Math.round(
    (maklergebuehrPercentage / 100) * principal,
  );
  const absoluteNotarkostenFromPercentage = Math.round(
    (notarkostenPercentage / 100) * principal,
  );
  const absoluteGrundbuchkostenFromPercentage = Math.round(
    (grundbuchkostenPercentage / 100) * principal,
  );

  const grundsteuer = (getGrundsteuer(bundesland) * principal) / 100;
  const nebenkosten =
    absoluteMaklergebuehrFromPercentage +
    absoluteGrundbuchkostenFromPercentage +
    absoluteNotarkostenFromPercentage +
    Math.round(grundsteuer);
  return Math.round(nebenkosten);
};
