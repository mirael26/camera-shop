import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loadProducts } from '../../store/api-action';
import Filters from '../filters/filters';
import Pagination from './pagination/pagination';
import Sorts from './sorts/sorts';
import { useSelector } from 'react-redux';
import { getAllProductsCount, } from '../../store/selectors';
import { useSearchParams } from 'react-router-dom';
import ProductList from './product-list/product-list';
import { Param } from '../../consts';

const PRODUCTS_COUNT_ON_PAGE = 9;
const DEFAULT_PAGE = '1';

const Catalog = (): JSX.Element => {
  const productsCount = useSelector(getAllProductsCount);
  const dispatch = useAppDispatch();

  const [params, setParams] = useSearchParams();

  useEffect(() => {
    dispatch(loadProducts()); // загружаем все товары один раз
  }, [dispatch]);

  useEffect(() => {
    if (!params.has(Param.Page)) {
      params.set(Param.Page, DEFAULT_PAGE);
      setParams(params);
    }
  }, [dispatch, params, setParams]);

  const pageCount = productsCount ? Math.ceil(productsCount / PRODUCTS_COUNT_ON_PAGE) : null;
  const catalogIsReady = !!productsCount;

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        {catalogIsReady &&
          <div className="page-content__columns">
            <div className="catalog__aside">
              <Filters/>
            </div>
            <div className="catalog__content">
              <Sorts/>
              {productsCount && <ProductList productsCountOnPage={PRODUCTS_COUNT_ON_PAGE}/>}
              {pageCount && (pageCount > 1) && <Pagination pageCount={pageCount}/>}
            </div>
          </div>}
      </div>
    </section>
  );
};

export default Catalog;
