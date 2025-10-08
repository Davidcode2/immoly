import { Sondertilgung } from "@/lib/models/sondertilgung";

export const sondertilgungenAccessor = (id: string): Sondertilgung[] => {
  const sondertilgungen = localStorage.getItem(`${id}-sondertilgungen`);
  return sondertilgungen ? JSON.parse(sondertilgungen) : [];
}

export const deleteSondertilgungen = (id: string) => {
  localStorage.removeItem(`${id}-sondertilgungen`);
}
