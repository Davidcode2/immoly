import { Sondertilgung } from "app/lib/models/sondertilgung";
import {
  getSondertilgungenCacheHelper,
  getTilgungswechselCacheHelper,
} from "./sonderCalculationsHelper";
import { Tilgungswechsel } from "app/lib/models/tilgungswechsel";

export default class SonderCacheHelper {
  constructor(
    private setSondertilgungenCache: (data: Sondertilgung[]) => void,
    private setTilgungswechselCache: (data: Tilgungswechsel[]) => void,
  ) { }

  getSondertilgungFromCache = async (
    calculationId: string,
    sondertilgungenCache: Sondertilgung[],
    update: boolean = false,
  ) => {
    const sondertilgungen = await getSondertilgungenCacheHelper(
      calculationId,
      sondertilgungenCache,
      update,
    );
    this.setSondertilgungenCache(sondertilgungen!);
    return sondertilgungen!;
  };

  getTilgungswechselFromCache = async (
    calculationId: string,
    tilgungswechselCache: Tilgungswechsel[],
    update: boolean = false,
  ) => {
    const tilgungswechsel = await getTilgungswechselCacheHelper(
      calculationId,
      tilgungswechselCache,
      update,
    );
    this.setTilgungswechselCache(tilgungswechsel!);
    return tilgungswechsel!;
  };
}
