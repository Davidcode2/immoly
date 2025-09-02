export const tilgungswechselAccessor = (id: string) => {
  const tilgungswechsel = localStorage.getItem(`${id}-tilgungswechsel`);
  return tilgungswechsel ? JSON.parse(tilgungswechsel) : [];
}
