import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loadDisplayedProducts, loadProducts } from '../../store/api-action';
import Filters from './filters/filters';
import Pagination from './pagination/pagination';
import ProductCard from '../product-card/product-card';
import Sorts from './sorts/sorts';
import { useSelector } from 'react-redux';
import { getAllProductsCount, getDisplayedProducts } from '../../store/selectors';
import { useSearchParams } from 'react-router-dom';

const DISPLAYED_PRODUCTS_COUNT = 9;
const DEFAULT_PAGE = '1';

const Catalog = (): JSX.Element => {
  const productsCount = useSelector(getAllProductsCount);
  const displayedProducts = useSelector(getDisplayedProducts);
  const dispatch = useAppDispatch();

  const [params, setParams] = useSearchParams();

  useEffect(() => {
    dispatch(loadProducts()); // загружаем все товары один раз
  }, [dispatch]);

  useEffect(() => {
    if (!params.has('page')) {
      params.set('page', DEFAULT_PAGE);
      setParams(params);
    }

    const page = params.get('page');

    const queryParams: {[key: string]: string | null} = { // подготавливаем параметры для запроса списка товаров
      _sort: params.get('sort'),
      _order: params.get('order'),
      _start: page ? (DISPLAYED_PRODUCTS_COUNT * +page - DISPLAYED_PRODUCTS_COUNT).toString() : null, // если есть страница, вычисляем начало и конец диапазона товаров, либо возвращаем null
      _end: page ? (DISPLAYED_PRODUCTS_COUNT * +page).toString() : null,
    };

    dispatch(loadDisplayedProducts(queryParams)); // загружаем товары, которые нужно вывести на страницу
  }, [dispatch, params, setParams]);

  const pageCount = productsCount ? Math.ceil(productsCount / DISPLAYED_PRODUCTS_COUNT) : null;

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        {displayedProducts &&
          <div className="page-content__columns">
            <div className="catalog__aside">
              <Filters/>
            </div>
            <div className="catalog__content">
              <Sorts/>
              <div className="cards catalog__cards">
                {displayedProducts?.map((product, i) => {
                  const key = `product-card-${i}`;
                  return <ProductCard key={key} product={product} />;
                })}
              </div>
              {pageCount && (pageCount > 1) && <Pagination pageCount={pageCount}/>}
            </div>
          </div>}
      </div>
    </section>
  );
};

export default Catalog;
