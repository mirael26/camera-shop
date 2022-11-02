export const addPriceSeparators = (price: number, separator = ' '): string | undefined => {
  if (price < 0) {
    return undefined;
  }
  let newPrice = String(Math.round(price));
  if (newPrice.length > 3) {
    newPrice = `${newPrice.slice(-0, -3)}${separator}${newPrice.slice(-3)}`;

    if (newPrice.length > 7) {
      newPrice = `${newPrice.slice(-0, -7)}${separator}${newPrice.slice(-7)}`;
    }
  }
  return newPrice;
};

export const deleteOneParam = (name: string, value: string, params: URLSearchParams) => {
  const allExistingValues = params.getAll(name); // получаем массив всех параметров с тем же именем
  params.delete(name); // удаляем все параметры с этим именем

  if (allExistingValues.length > 1) { // если были какие-то еще параметры кроме удаляемого
    allExistingValues.forEach((existingValue) => {
      if (existingValue !== value) { // если значение параметра не то, которое мы хотим удалить
        params.append(name, existingValue); // добавляем его в params
      }
    })
  }
  return params;
};
