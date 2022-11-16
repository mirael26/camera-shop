import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Param } from '../../../consts';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { loadProducts } from '../../../store/api-action';
import { getAllProductsAsc, getFilteredExcludingPriceProductsAsc } from '../../../store/selectors';

const DEFAULT_PAGE = '1';

const PriceFilter = () => {
  const productsAsc = useSelector(getAllProductsAsc);
  const filteredProductsAsc = useSelector(getFilteredExcludingPriceProductsAsc);
  const dispatch = useAppDispatch();

  const [params, setParams] = useSearchParams();
  const [inputValue, setInputValue] = useState({ min: '', max: ''});
  const refMinInput = useRef<HTMLInputElement>(null);
  const refMaxInput = useRef<HTMLInputElement>(null);

  const catalogAsc = filteredProductsAsc || productsAsc || null;
  const catalogMin = catalogAsc ? catalogAsc[0].price : null;
  const catalogMax = catalogAsc ? catalogAsc[catalogAsc.length - 1].price : null;

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

  const setMin = (evt: FocusEvent) => {
    const value = (evt.target as HTMLInputElement).value;
    console.log(value);
    if (value === Param.PriceMin) { // если значение не изменилось
      return;
    }

    if (value === '') { // если значение - пустая строка
      params.delete(Param.PriceMin);
      params.set(Param.Page, DEFAULT_PAGE);
      setParams(params); // удаляем параметр
      setInputValue((prev) => ({...prev, min: ''}));
      return;
    }

    const max = params.get(Param.PriceMax) || catalogMax;
    let newMin = value;

    if (catalogMin && +value < catalogMin) {
      newMin = catalogMin.toString(); // если мин.цена ниже мин.цены всех товаров - устанавливаем мин.существующую цену
    } else if (max && +value > +max) {
      newMin = max.toString(); // если мин.цена выше макс.цены, устанавливаем макс.цену
    }

    if (catalogAsc && !catalogAsc.find((product) => product.price === +newMin)) { // если в каталоге не найден товар с такой ценой
      const nearestMinProduct = catalogAsc.find((product, i) => {
        const prevProduct = catalogAsc[i - 1];
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
    document.removeEventListener('keydown', handleMinEnterKeydown);
  };

  const handleMinEnterKeydown = (keydownEvt: KeyboardEvent) => {
    if (keydownEvt.key === 'Enter') {
      refMinInput.current?.blur();
    }
  };

  const handleMinInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputValue((prev) => ({...prev, min: value})); // устанавливаем введенное значение в стейт для отображения

    refMinInput.current?.removeEventListener('blur', setMin);
    document.removeEventListener('keydown', handleMinEnterKeydown);
    refMinInput.current?.addEventListener('blur', setMin);
    document.addEventListener('keydown', handleMinEnterKeydown);
  };

  const setMax = (evt: FocusEvent) => {
    const value = (evt.target as HTMLInputElement).value;
    console.log(value);
    if (value === Param.PriceMax) { // если значение не изменилось
      return;
    }

    if (value === '') { // если значение - пустая строка
      params.delete(Param.PriceMax); // удаляем параметр
      params.set(Param.Page, DEFAULT_PAGE);
      setParams(params);
      setInputValue((prev) => ({...prev, max: ''}));
      return;
    }

    const min = params.get(Param.PriceMin) || catalogMin;
    let newMax = value;

    if (catalogMax && +value > catalogMax) {
      newMax = catalogMax.toString(); // если макс.цена выше макс.цены всех товаров - устанавливаем макс.существующую цену
    } else if (min && +value < +min) {
      newMax = min.toString(); // если макс.цена ниже мин.цены, устанавливаем мин.цену
    }

    if (catalogAsc && !catalogAsc.find((product) => product.price === +newMax)) { // если в каталоге не найден товар с такой ценой
      const nearestMinProduct = catalogAsc.find((product, i) => {
        const nextProduct = catalogAsc[i + 1];
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
    document.removeEventListener('keydown', handleMaxEnterKeydown);
  };

  const handleMaxEnterKeydown = (keydownEvt: KeyboardEvent) => {
    if (keydownEvt.key === 'Enter') {
      refMaxInput.current?.blur();
    }
  };

  const handleMaxInputChange = (evt: ChangeEvent<HTMLInputElement>) => {  
    const value = evt.target.value;
    setInputValue((prev) => ({...prev, max: value})); // устанавливаем введенное значение в стейт для отображения

    refMaxInput.current?.removeEventListener('blur', setMax); // обновляем обработчики событий
    document.removeEventListener('keydown', handleMaxEnterKeydown);
    refMaxInput.current?.addEventListener('blur', setMax);
    document.addEventListener('keydown', handleMaxEnterKeydown);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input type="number" name="price" ref={refMinInput} data-testid="price-input" placeholder={catalogMin?.toString() || 'от'} value={inputValue.min} onChange={handleMinInputChange}/>
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input type="number" name="priceUp" ref={refMaxInput} data-testid="price-input" placeholder={catalogMax?.toString() || 'до'} value={inputValue.max} onChange={handleMaxInputChange}/>
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default PriceFilter;
