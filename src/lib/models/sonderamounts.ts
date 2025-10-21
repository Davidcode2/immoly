import { Sondertilgung } from './sondertilgung';
import { Tilgungswechsel } from './tilgungswechsel';
import { Zinswechsel } from './zinswechsel';

export type SonderAmounts = {
  sondertilgungen: Sondertilgung[];
  tilgungswechsel: Tilgungswechsel[];
  zinswechsel: Zinswechsel[];
};
