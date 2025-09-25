import { getGrundsteuer } from "app/services/nebenkostenGrundsteuer";
import {
  useBundeslandStore,
  useGrundbuchkostenPercentageStore,
  useMaklergebuehrPercentageStore,
  useNotarkostenPercentageStore,
} from "app/store";

export function useCalcNebenkostenSum(principal: number) {
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
