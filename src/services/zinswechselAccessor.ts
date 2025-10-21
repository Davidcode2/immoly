import { Zinswechsel } from "@/lib/models/zinswechsel";

export const zinswechselAccessor = (id: string): Zinswechsel[] => {
  const zinswechsel = localStorage.getItem(`${id}-zinswechsel`);
  return zinswechsel ? JSON.parse(zinswechsel) : [];
}

export const deleteZinswechsel = (id: string) => {
  localStorage.removeItem(`${id}-zinswechsel`);
}
