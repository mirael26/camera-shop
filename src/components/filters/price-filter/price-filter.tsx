import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Param } from '../../../consts';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { loadProducts } from '../../../store/api-action';
import { getAllProductsAsc } from '../../../store/selectors';

const DEFAULT_PAGE = '1';

const PriceFilter = () => {
  const productsAsc = useSelector(getAllProductsAsc);
  const minPriceInCatalog = productsAsc ? productsAsc[0].price : null;
  const maxPriceInCatalog = productsAsc ? productsAsc[productsAsc.length - 1].price : null;
  const dispatch = useAppDispatch();

  const [params, setParams] = useSearchParams();
  const [inputValue, setInputValue] = useState({ min: '', max: ''});
  const refMinInput = useRef<HTMLInputElement>(null);
  const refMaxInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!productsAsc) {
      dispatch(loadProducts());
    }
  }, [dispatch, productsAsc]);

  useEffect(() => { // обвновление значений из params
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

      refMinInput.current?.removeEventListener('blur', setMin);
      document.removeEventListener('keydown', handleEnterKeydown);
    };

    const handleEnterKeydown = (keydownEvt: KeyboardEvent) => {
      if (keydownEvt.key === 'Enter') {
        setMin();
      }
    };

    refMinInput.current?.addEventListener('blur', setMin);
    document.addEventListener('keydown', handleEnterKeydown);
  };

  const handleMaxInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputValue((prev) => ({...prev, max: value})); // устанавливаем введенное значение в стейт для отображения

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

      refMaxInput.current?.removeEventListener('blur', setMax);
      document.removeEventListener('keydown', handleEnterKeydown);
    };

    const handleEnterKeydown = (keydownEvt: KeyboardEvent) => {
      if (keydownEvt.key === 'Enter') {
        setMax();
      }
    };

    refMaxInput.current?.addEventListener('blur', setMax);
    document.addEventListener('keydown', handleEnterKeydown);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input type="number" name="price" ref={refMinInput} data-testid="price-input" placeholder={minPriceInCatalog?.toString() || 'от'} value={inputValue.min} onChange={handleMinInputChange}/>
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input type="number" name="priceUp" ref={refMaxInput} data-testid="price-input" placeholder={maxPriceInCatalog?.toString() || 'до'} value={inputValue.max} onChange={handleMaxInputChange}/>
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default PriceFilter;
