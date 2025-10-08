import { Sondertilgung } from "@/lib/models/sondertilgung";
import {
  deleteTilgungswechsel,
  tilgungswechselAccessor,
} from "./tilgungswechselAccessor";
import {
  deleteSondertilgungen,
  sondertilgungenAccessor,
} from "./sondertilgungAccessor";

export const updateSonderAmountInBrowserStorage = (
  type: string,
  year: string,
  newAmount: string,
  calculationId: string,
) => {
  const existingString = localStorage.getItem(`${calculationId}-${type}`);
  const existing: Sondertilgung[] = JSON.parse(existingString || "[]");
  const yearNumber = Number(year);
  const newAmountNumber = Number(newAmount);

  const index = existing.findIndex((item) => item.year === yearNumber);

  let updated: Sondertilgung[];

  if (index > -1) {
    updated = [...existing];
    updated[index] = {
      ...updated[index],
      amount: newAmountNumber,
    };
  } else {
    updated = [...existing, { year: yearNumber, amount: newAmountNumber }];
  }
  const updatedString = JSON.stringify(updated);
  localStorage.setItem(`${calculationId}-${type}`, updatedString);
};

export const transferSonderAmounts = (uuid: string) => {
  const unassignedSondertilgung = sondertilgungenAccessor("null");
  const unassignedTilgungswechsel = tilgungswechselAccessor("null");

  for (const sondertilgung of unassignedSondertilgung) {
    updateSonderAmountInBrowserStorage(
      "sondertilgungen",
      String(sondertilgung.year),
      String(sondertilgung.amount),
      uuid,
    );
  }
  for (const tilgungswechsel of unassignedTilgungswechsel) {
    updateSonderAmountInBrowserStorage(
      "tilgungswechsel",
      String(tilgungswechsel.year),
      String(tilgungswechsel.amount),
      uuid,
    );
  }
  deleteSondertilgungen("null");
  deleteTilgungswechsel("null");
};
