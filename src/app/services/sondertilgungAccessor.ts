export const sondertilgungenAccessor = (id: string) => {
  const sondertilgungen = localStorage.getItem(`${id}-sondertilgungen`);
  return sondertilgungen ? JSON.parse(sondertilgungen) : [];
}
