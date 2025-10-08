import BaseModel from "./baseModel";
import { Sondertilgung } from "./sondertilgung";
import { Tilgungswechsel } from "./tilgungswechsel";

export default interface CashRoiModel extends BaseModel {
  cash_roi?: number;
  sondertilgungen?: Sondertilgung[];
  tilgungswechsel?: Tilgungswechsel[];
}
