import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loadProducts } from '../../store/api-action';
import { getAllProducts } from '../../store/selectors';
import { ISearchedProduct } from '../../types/data.type';
import SearchList from './search-list/search-list';

const Search = () => {
  const products = useSelector(getAllProducts);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [isListOpened, setListOpened] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchedProducts, setSearchedProducts] = useState<Array<ISearchedProduct>>([]);

  useEffect(() => {
    if (!products) {
      dispatch(loadProducts()); // если не загружены товары - отправляем запрос на сервер
    }
  }, [dispatch, products]);

  useEffect(() => {
    setInputValue(''); // сбрасываем поиск припереходе на другую страницу
  }, [pathname]);

  useEffect(() => {
    if (inputValue.trim() !== '') {
      searchProducts(); // если введено какое-то значение, ищем товары
    } else {
      setSearchedProducts([]); // иначе устанавливаем в найденные товары пустой массив
    }
  }, [inputValue]);

  useEffect(() => {
    if (searchedProducts.length) {
      setListOpened(true);
    } else {
      setListOpened(false);
    }
  }, [searchedProducts]);

  useEffect(() => {
    const handleOverClick = (evt: MouseEvent) => { // слушатель для клика вне блока поиска
      const searchBlock = document.querySelector('.form-search');
      const isClickOver = searchBlock ? !evt.composedPath().includes(searchBlock) : true; // если блок существует, проверяем, был ли произведен клик на блоке или дочерних элементах

      if (isClickOver) {
        setListOpened(false); // скрываем список, если был клик вне блока
        window.removeEventListener('click', handleOverClick); // удаляем слушатель
      }
    };

    if (isListOpened) {
      window.addEventListener('click', handleOverClick); // добавляем слушатель на window после октрытия списка найденных товаров
    }
  }, [isListOpened]);

  const searchProducts = () => {
    const newSearchedProducts: Array<ISearchedProduct> = [];

    if (products !== null) {
      const regExp = new RegExp(inputValue, 'i'); // создаем регулярное выражение из введенного значения

      products.forEach((product) => {
        if (regExp.test(product.name)) { // из списка товаров отбираем те, чьи имена соответствуют регулярке
          newSearchedProducts.push({name: product.name, id: product.id}); // добавляем в массив найденных товаров только имя и id
        }
      });
    }
    setSearchedProducts(newSearchedProducts);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.currentTarget.value;
    setInputValue(newValue);
  };

  const handleInputFocus = () => {
    if (!isListOpened && inputValue.trim() !== '' && searchedProducts.length) { // если поле ввода попало в фокус, было введено значение, найдены товары и список спрятан - снова показываем список
      setListOpened(true);
    }
  };

  return (
    <div className={`form-search${isListOpened ? ' list-opened' : ''}`}>
      <form onSubmit={(evt) => evt.preventDefault()}>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" value={inputValue} onChange={handleInputChange} onFocus={handleInputFocus}/>
        </label>
        {searchedProducts.length ? <SearchList searchedProducts={searchedProducts}/> : null}
      </form>
      <button className={`form-search__reset${inputValue !== '' ? ' visible' : ''}`} type="reset" onClick={() => setInputValue('')}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
};

export default Search;
