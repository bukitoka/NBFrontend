export const priceFormatter = (number) => {
  if (number === null || number === undefined) {
    return 0;
  }

  const numberString = number.toString();
  const parts = [];
  let i = numberString.length;

  while (i > 0) {
    parts.unshift(numberString.substring(i - 3, i));
    i -= 3;
  }

  const formatted = parts.join(".");
  return formatted;
};

