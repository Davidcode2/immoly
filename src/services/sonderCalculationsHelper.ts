import { Sondertilgung } from "@/lib/models/sondertilgung";
import { Tilgungswechsel } from "@/lib/models/tilgungswechsel";
import { tilgungswechselAccessor } from "./tilgungswechselAccessor";
import { sondertilgungenAccessor } from "./sondertilgungAccessor";
import { Zinswechsel } from "@/lib/models/zinswechsel";
import { zinswechselAccessor } from "./zinswechselAccessor";

export const getTilgungswechselCacheHelper = async (
  calculationId: string,
  tilgungswechselCache: Tilgungswechsel[],
  update: boolean,
): Promise<Tilgungswechsel[] | null> => {
  if (tilgungswechselCache.length && !update) {
    return tilgungswechselCache;
  } else {
    const tilgungswechsel = tilgungswechselAccessor(calculationId);
    if (!tilgungswechsel) {
      console.error(
        "No tilgungswechsel found for calculationId:",
        calculationId,
      );
      return null;
    }
    return tilgungswechsel;
  }
};

export const getSondertilgungenCacheHelper = async (
  calculationId: string,
  sondertilgungenCache: Sondertilgung[],
  update: boolean,
): Promise<Sondertilgung[] | null> => {
  if (sondertilgungenCache && sondertilgungenCache.length && !update) {
    return sondertilgungenCache;
  } else {
    const sondertilgungen = sondertilgungenAccessor(calculationId);
    if (!sondertilgungen) {
      console.error(
        "No sondertilgungen found for calculationId:",
        calculationId,
      );
      return null;
    }
    return sondertilgungen;
  }
};

export const getZinswechselCacheHelper = async (
  calculationId: string,
  zinswechselCache: Zinswechsel[],
  update: boolean,
): Promise<Zinswechsel[] | null> => {
  if (zinswechselCache && zinswechselCache.length && !update) {
    return zinswechselCache;
  } else {
    const zinswechsel = zinswechselAccessor(calculationId);
    if (!zinswechsel) {
      console.error(
        "No sondertilgungen found for calculationId:",
        calculationId,
      );
      return null;
    }
    return zinswechsel;
  }
};
