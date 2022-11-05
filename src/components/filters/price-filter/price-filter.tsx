import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Param } from '../../../consts';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { loadProducts } from '../../../store/api-action';
import { getAllProductsAsc } from '../../../store/selectors';

const INPUT_DELAY_MS = 1500;
const DEFAULT_PAGE = '1';

const PriceFilter = () => {
  const productsAsc = useSelector(getAllProductsAsc);
  const minPriceInCatalog = productsAsc ? productsAsc[0].price : null;
  const maxPriceInCatalog = productsAsc ? productsAsc[productsAsc.length - 1].price : null;
  const dispatch = useAppDispatch();

  const [params, setParams] = useSearchParams();
  const [inputValue, setInputValue] = useState({ min: '', max: ''});
  const [timer, setTimer] = useState<{[key: string]: null | NodeJS.Timeout}>({ min: null, max: null});

  useEffect(() => {
    if (!productsAsc) {
      dispatch(loadProducts());
    }
  }, [dispatch, productsAsc]);

  useEffect(() => () => { // очищаем таймеры
    if (timer.min) {
      clearTimeout(timer.min);
    }
    if (timer.max) {
      clearTimeout(timer.max);
    }
  }, []); // зависимости не нужны, только для очищения при демонтаже

  useEffect(() => {
    const minParam = params.get(Param.PriceMin) || '';
    const maxParam = params.get(Param.PriceMax) || '';
    if (minParam !== inputValue.min) {
      setInputValue((prev) => ({...prev, min: minParam}));
    }
    if (maxParam !== inputValue.max) {
      setInputValue((prev) => ({...prev, max: maxParam}));
    }
  }, [params]); // если добавить зависимости из eslint.warning, некорректно работает

  const handleMinInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputValue((prev) => ({...prev, min: value})); // устанавливаем введенное значение в стейт для отображения

    if (timer.min) {
      clearTimeout(timer.min); // debounce
    }

    const setMin = () => {
      if (value === '') { // если значение - пустая строка
        params.delete(Param.PriceMin);
        params.set(Param.Page, DEFAULT_PAGE);
        setParams(params); // удаляем параметр
        setInputValue((prev) => ({...prev, min: ''}));
        return;
      }

      const max = params.get(Param.PriceMax) || maxPriceInCatalog;
      let newMin = value;

      if (minPriceInCatalog && +value < minPriceInCatalog) {
        newMin = minPriceInCatalog.toString(); // если мин.цена ниже мин.цены всех товаров - устанавливаем мин.существующую цену
      } else if (max && +value > +max) {
        newMin = max.toString(); // если мин.цена выше макс.цены, устанавливаем макс.цену
      }

      if (productsAsc && !productsAsc.find((product) => product.price === +newMin)) { // если в каталоге не найден товар с такой ценой
        const nearestMinProduct = productsAsc.find((product, i) => {
          const prevProduct = productsAsc[i - 1];
          return prevProduct && (prevProduct.price < +newMin) && (product.price > +newMin); // находим товар с ближайшей минимальной ценой
        });
        const nearestMinPrice = nearestMinProduct?.price;
        newMin = nearestMinPrice ? nearestMinPrice.toString() : newMin; // записываем цену этого товара
      }

      params.set(Param.PriceMin, newMin);
      params.set(Param.Page, DEFAULT_PAGE);
      setParams(params);
      setInputValue((prev) => ({...prev, min: newMin})); // записываем новое значение в стейт
    };

    const timerMin = setTimeout(() => setMin(), INPUT_DELAY_MS); // устанавливаем таймер на смену значений
    setTimer((prev) => ({...prev, min: timerMin})); // сохраняем таймер
  };

  const handleMaxInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputValue((prev) => ({...prev, max: value})); // устанавливаем введенное значение в стейт для отображения

    if (timer.max) {
      clearTimeout(timer.max); // debounce
    }

    const setMax = () => {
      if (value === '') { // если значение - пустая строка
        params.delete(Param.PriceMax); // удаляем параметр
        params.set(Param.Page, DEFAULT_PAGE);
        setParams(params);
        setInputValue((prev) => ({...prev, max: ''}));
        return;
      }

      const min = params.get(Param.PriceMin) || minPriceInCatalog;
      let newMax = value;

      if (maxPriceInCatalog && +value > maxPriceInCatalog) {
        newMax = maxPriceInCatalog.toString(); // если макс.цена выше макс.цены всех товаров - устанавливаем макс.существующую цену
      } else if (min && +value < +min) {
        newMax = min.toString(); // если макс.цена ниже мин.цены, устанавливаем мин.цену
      }

      if (productsAsc && !productsAsc.find((product) => product.price === +newMax)) { // если в каталоге не найден товар с такой ценой
        const nearestMinProduct = productsAsc.find((product, i) => {
          const nextProduct = productsAsc[i + 1];
          return nextProduct && (product.price < +newMax) && (nextProduct.price > +newMax); // находим товар с ближайшей максимальной ценой
        });
        const nearestMinPrice = nearestMinProduct?.price;
        newMax = nearestMinPrice ? nearestMinPrice.toString() : newMax; // записываем цену этого товара
      }

      params.set(Param.PriceMax, newMax); // записываем новое значение в параметры
      params.set(Param.Page, DEFAULT_PAGE);
      setParams(params);
      setInputValue((prev) => ({...prev, max: newMax})); // записываем новое значение в стейт
    };

    const timerMax = setTimeout(() => setMax(), INPUT_DELAY_MS); // устанавливаем таймер на смену значений
    setTimer((prev) => ({...prev, max: timerMax})); // сохраняем таймер
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input type="number" name="price" placeholder={minPriceInCatalog?.toString() || 'от'} value={inputValue.min} onChange={handleMinInputChange}/>
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input type="number" name="priceUp" placeholder={maxPriceInCatalog?.toString() || 'до'} value={inputValue.max} onChange={handleMaxInputChange}/>
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default PriceFilter;
