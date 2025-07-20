import BaseModel from "./baseModel";
import { Sondertilgung } from "./sondertilgung";

export default interface CashRoiModel extends BaseModel {
  cash_roi?: number;
  sondertilgungen?: Sondertilgung[]
}
