import { Sondertilgung } from "app/lib/models/sondertilgung";
import { Tilgungswechsel } from "app/lib/models/tilgungswechsel";
import { tilgungswechselAccessor } from "./tilgungswechselAccessor";
import { sondertilgungenAccessor } from "./sondertilgungAccessor";

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
