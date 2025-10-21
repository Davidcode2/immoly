import { Sondertilgung } from "@/lib/models/sondertilgung";
import { Zinswechsel } from "@/lib/models/zinswechsel";
import { Tilgungswechsel } from "@/lib/models/tilgungswechsel";
import SonderCacheHelper from "@/services/cacheHelper";
import { useState } from "react";
import { SonderAmounts } from "@/lib/models/sonderamounts";

export function useUpdateSonderamounts() {

  const [sondertilgungenCache, setSondertilgungenCache] = useState<
    Sondertilgung[]
  >([]);
  const [tilgungswechselCache, setTilgungswechselCache] = useState<
    Tilgungswechsel[]
  >([]);
  const [zinswechselCache, setZinswechselCache] = useState<Zinswechsel[]>([]);

  const sonderCacheHelper = new SonderCacheHelper(
    setSondertilgungenCache,
    setTilgungswechselCache,
    setZinswechselCache,
  );

  const getSonderAmounts = async (
    calculation_id: string,
    update: boolean = false,
  ): Promise<SonderAmounts> => {
    const sondertilgungen = await sonderCacheHelper.getSondertilgungFromCache(
      calculation_id,
      sondertilgungenCache,
      update,
    );
    const tilgungswechsel = await sonderCacheHelper.getTilgungswechselFromCache(
      calculation_id,
      tilgungswechselCache,
      update,
    );
    const zinswechsel = await sonderCacheHelper.getZinswechselFromCache(
      calculation_id,
      zinswechselCache,
      update,
    );
    return { sondertilgungen, tilgungswechsel, zinswechsel } as SonderAmounts;
  };
  return getSonderAmounts;
}
