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

export function calcCursorPosition(
  selectionStart: number,
  unformatted: string,
  dotsInFormattedInput: number,
  prevValue: string,
  prevNumberOfDots: number,
) {
  let newPosition = selectionStart;
  if (prevValue.length < unformatted.length) {
    // user added a digit
    if (prevNumberOfDots < dotsInFormattedInput) {
      // dot was added when formatting value
      newPosition = selectionStart + 1;
    }
    return newPosition;
  } else if (prevValue.length > unformatted.length) {
    // user removed a digit
    if (prevNumberOfDots > dotsInFormattedInput) {
      if (selectionStart !== 0) {
        // handles e.g. 1.234 -> 124
        newPosition = selectionStart - 1;
        return newPosition;
      }
    } else {
      return newPosition;
    }
  }
  return newPosition;
}
