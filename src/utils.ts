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

  if (!allExistingValues.length) { // если такого параметра нет, возвращаем params без изменений
    return params;
  }
  params.delete(name); // удаляем все параметры с этим именем

  const isOnlyDelitingParam = (allExistingValues.length === 1) && (allExistingValues[0] === value); // проверяем, есть ли еще какие-то параметры

  if (!isOnlyDelitingParam) { // если были какие-то еще параметры кроме удаляемого
    allExistingValues.forEach((existingValue) => {
      if (existingValue !== value) { // если значение параметра не то, которое мы хотим удалить
        params.append(name, existingValue); // добавляем его в params
      }
    });
  }
  return params;
};

export const checkFilters = <T extends string>(params: URLSearchParams, filtersState: {[key in T]: boolean}, setFiltersState: React.Dispatch<React.SetStateAction<typeof filtersState>>, filterName: string) => {
  const allActiveParams = params.getAll(filterName); // получаем все активные фильтры из параметров
  const allFilters = Object.keys(filtersState) as Array<T>; // получаем список всех фильтров

  allFilters.forEach((filter) => {
    if (allActiveParams.includes(filter) && !filtersState[filter]) { // проверяем, если фильтр есть в параметрах, но не включен
      setFiltersState((prev) => ({...prev, [filter]: true})); // включаем (чекаем)
    }
    if (!allActiveParams.includes(filter) && filtersState[filter]) { // проверяем, если фильтра нет в параметрах, но он включен
      setFiltersState((prev) => ({...prev, [filter]: false})); // выключаем
    }
  });
};
