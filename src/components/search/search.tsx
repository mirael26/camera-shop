import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loadProducts } from '../../store/api-action';
import { getAllProducts } from '../../store/selectors';
import { ISearchedProduct } from '../../types/data.type';
import SearchList from './search-list/search-list';

const Search = () => {
  const products = useSelector(getAllProducts);
  const dispatch = useAppDispatch();

  const [isListOpened, setListOpened] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchedProducts, setSearchedProducts] = useState<Array<ISearchedProduct>>([]);

  const searchProducts = (value: string) => {
    const newSearchedProducts: Array<ISearchedProduct> = [];

    if (products !== null) {
      const regExp = new RegExp(value, 'i'); // создаем регулярное выражение из введенного значения

      products.forEach((product) => {
        if (regExp.test(product.name)) { // из списка товаров отбираем те, чьи имена соответствуют регулярке
          newSearchedProducts.push({name: product.name, id: product.id}); // добавляем в массив найденных товаров только имя и id
        }
      });
    }
    return newSearchedProducts;
  };

  const handleOverClick = useCallback((evt: MouseEvent) => { // слушатель для клика вне блока поиска
    const searchBlock = document.querySelector('.form-search');
    const isClickOver = searchBlock ? !evt.composedPath().includes(searchBlock) : true; // если блок существует, проверяем, был ли произведен клик на блоке или дочерних элементах

    if (isClickOver) {
      window.removeEventListener('click', handleOverClick);
      setListOpened(false);
    }
  }, []);

  useEffect(() => {
    if (!products) {
      dispatch(loadProducts()); // если не загружены товары - отправляем запрос на сервер
    }
    return () => window.removeEventListener('click', handleOverClick);
  }, [dispatch, products, handleOverClick]);

  const openList = () => {
    window.addEventListener('click', handleOverClick); // добавляем слушатель для клика вне блока на window
    setListOpened(true);
  };

  const closeList = () => {
    window.removeEventListener('click', handleOverClick);
    setListOpened(false);
  };

  const resetForm = () => {
    setInputValue('');
    setSearchedProducts([]);
    closeList();
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.currentTarget.value;
    setInputValue(newValue);

    let newSearchedProducts = null;

    if (newValue.trim() !== '') {
      newSearchedProducts = searchProducts(newValue); // если введено какое-то значение, ищем товары
      setSearchedProducts(newSearchedProducts);
    } else {
      setSearchedProducts([]); // иначе устанавливаем в найденные товары пустой массив
    }

    if (newSearchedProducts && newSearchedProducts.length) {
      openList(); // если найдены товары по запросу - открыть список найденных товаров
    } else {
      closeList(); // иначе - закрыть
    }
  };

  const handleInputFocus = () => {
    if (!isListOpened && inputValue.trim() !== '' && searchedProducts.length) { // если поле ввода попало в фокус, было введено значение, найдены товары и список спрятан - снова показываем список
      openList();
    }
  };

  return (
    <div className={`form-search${isListOpened ? ' list-opened' : ''}`} data-testid='form-search'>
      <form onSubmit={(evt) => evt.preventDefault()}>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" value={inputValue} onChange={handleInputChange} onFocus={handleInputFocus}/>
        </label>
        {searchedProducts.length ? <SearchList searchedProducts={searchedProducts} onLinkClick={resetForm}/> : null}
      </form>
      <button className={`form-search__reset${inputValue !== '' ? ' visible' : ''}`} type="reset" onClick={resetForm}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
};

export default Search;
