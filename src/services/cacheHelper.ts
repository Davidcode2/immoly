import { Sondertilgung } from "@/lib/models/sondertilgung";
import {
  getSondertilgungenCacheHelper,
  getTilgungswechselCacheHelper,
  getZinswechselCacheHelper,
} from "./sonderCalculationsHelper";
import { Tilgungswechsel } from "@/lib/models/tilgungswechsel";
import { Zinswechsel } from "@/lib/models/zinswechsel";

export default class SonderCacheHelper {
  constructor(
    private setSondertilgungenCache: (data: Sondertilgung[]) => void,
    private setTilgungswechselCache: (data: Tilgungswechsel[]) => void,
    private setZinswechselCache: (data: Zinswechsel[]) => void,
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

  getZinswechselFromCache = async (
    calculationId: string,
    zinswechselCache: Zinswechsel[],
    update: boolean = false,
  ) => {
    const zinswechsel = await getZinswechselCacheHelper(
      calculationId,
      zinswechselCache,
      update,
    );
    this.setZinswechselCache(zinswechsel!);
    return zinswechsel!;
  };
}
