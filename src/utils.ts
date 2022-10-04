export const addPriceSeparators = (price: number, separator: string = ` `): string => {
  let newPrice = String(Math.round(price));
  if (newPrice.length > 3) {
    newPrice = `${newPrice.slice(-0, -3)}${separator}${newPrice.slice(-3)}`;

    if (newPrice.length > 7) {
      newPrice = `${newPrice.slice(-0, -7)}${separator}${newPrice.slice(-7)}`
    }
  }
  return newPrice;
};