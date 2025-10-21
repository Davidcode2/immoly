import BaseModel from "./baseModel";
import { Sondertilgung } from "./sondertilgung";
import { Tilgungswechsel } from "./tilgungswechsel";
import { Zinswechsel } from "./zinswechsel";

export interface CalculationDbo extends BaseModel {
  created_at: string;
  id: string;
  maklerguehrPercentage: number;
  bundesland: string;
  sondertilgungen?: Sondertilgung[];
  tilgungswechsel?: Tilgungswechsel[];
  zinswechsel?: Zinswechsel[];
}
