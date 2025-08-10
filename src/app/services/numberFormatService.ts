export function formatGerman(value: string): string {
  if (!value) return "";

  // Remove all non-digit and non-comma characters
  const sanitized = value.replace(/\./g, "").replace(",", ".");

  const number = Number(sanitized);
  if (isNaN(number)) return "";

  return new Intl.NumberFormat("de-DE").format(number);
}

export function parseGerman(value: string): number {
  return Number(value.replace(/\./g, "").replace(",", "."));
}

export function parseDecimal(value: string) {
  return parseFloat(value.replace(",", "."));
}

