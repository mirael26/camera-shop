import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Param } from '../../../consts';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { loadProducts } from '../../../store/api-action';
import { getMaxPriceInCatalog, getMaxPriceInDisplayed, getMinPriceInCatalog, getMinPriceInDisplayed } from '../../../store/selectors';

const INPUT_DELAY_MS = 1500;

const PriceFilter = () => {
  const minPriceInCatalog = useSelector(getMinPriceInCatalog);
  const maxPriceInCatalog = useSelector(getMaxPriceInCatalog);
  const displayedMinPrice = useSelector(getMinPriceInDisplayed);
  const displayedMaxPrice = useSelector(getMaxPriceInDisplayed);
  const dispatch = useAppDispatch();

  const [params, setParams] = useSearchParams();
  const [inputValue, setInputValue] = useState({ min: '', max: ''});
  const [timer, setTimer] = useState<{[key: string]: null | NodeJS.Timeout}>({ min: null, max: null});

  useEffect(() => {
    if (!minPriceInCatalog || !!maxPriceInCatalog) {
      dispatch(loadProducts()); // если еще нет максимальной и минимальной цены - отправляем запрос на сервер
    }
  }, [dispatch, minPriceInCatalog, maxPriceInCatalog]);

  useEffect(() => () => { // очищаем таймеры
    if (timer.min) {
      clearTimeout(timer.min);
    }
    if (timer.max) {
      clearTimeout(timer.max);
    }
  }, []); // зависимости не нужны, только для очищения при демонтаже

  useEffect(() => { // корректируем введенные значения в полях согласно пришедшим данным с сервера
    const min = params.get(Param.PriceMin);
    const max = params.get(Param.PriceMax);
    if (displayedMinPrice && min && displayedMinPrice > +min) { // если введена мин.цена меньше, чем мин.цена с сервера, отображаем в поле мин.цену с сервера
      setInputValue((prev) => ({...prev, min: displayedMinPrice.toString()}));
    }
    if (displayedMaxPrice && max && displayedMaxPrice > +max) { // если введена макс.цена больше, чем макс.цена с сервера, отображаем в поле макс.цену с сервера
      setInputValue((prev) => ({...prev, min: displayedMaxPrice.toString()}));
    }
  }, [displayedMinPrice, displayedMaxPrice]); // должно срабатывать только при изменении приходящих данных с сервера! (eslint warning)

  const handleMinInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputValue((prev) => ({...prev, min: value})); // устанавливаем введенное значение в стейт для отображения

    if (timer.min) {
      clearTimeout(timer.min); // debounce
    }

    const setMin = () => {
      const max = params.get(Param.PriceMax) || maxPriceInCatalog;
      let newMin = value;

      if (minPriceInCatalog && +value < minPriceInCatalog) {
        newMin = minPriceInCatalog.toString(); // если мин.цена ниже мин.цены всех товаров - устанавливаем мин.существующую цену
      } else if (max && +value > +max) {
        newMin = max.toString(); // если мин.цена выше макс.цены, устанавливаем макс.цену
      }
      params.set(Param.PriceMin, newMin);
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
      const min = params.get(Param.PriceMin) || minPriceInCatalog;
      let newMax = value;

      if (maxPriceInCatalog && +value > maxPriceInCatalog) {
        newMax = maxPriceInCatalog.toString(); // если макс.цена выше макс.цены всех товаров - устанавливаем макс.существующую цену
      } else if (min && +value < +min) {
        newMax = min.toString(); // если макс.цена ниже мин.цены, устанавливаем мин.цену
      }
      params.set(Param.PriceMax, newMax);
      setParams(params); // записываем новое значение в параметры
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
            <input type="number" name="price" placeholder={params.get(Param.PriceMin) || minPriceInCatalog?.toString() || 'от'} value={inputValue.min || ''} onChange={handleMinInputChange}/>
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input type="number" name="priceUp" placeholder={params.get(Param.PriceMax) || maxPriceInCatalog?.toString() || 'до'} value={inputValue.max || ''} onChange={handleMaxInputChange}/>
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default PriceFilter;