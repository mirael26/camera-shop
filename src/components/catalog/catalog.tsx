import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loadProducts } from '../../store/api-action';
import Filters from './filters/filters';
import Pagination from './pagination/pagination';
import ProductCard from '../product-card/product-card';
import Sorts from './sorts/sorts';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../../store/selectors';
import { useSearchParams } from 'react-router-dom';

const DISPLAYED_PRODUCTS_COUNT = 9;
const DEFAULT_PAGE = '1';

const Catalog = (): JSX.Element => {
  const products = useSelector(getAllProducts);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('page');

  useEffect(() => {
    dispatch(loadProducts());
    if (!searchParams.has('page')) {
      setSearchParams({page: DEFAULT_PAGE});
    }
  }, [dispatch, searchParams, setSearchParams]);

  const pageCount = products ? Math.ceil(products.length / DISPLAYED_PRODUCTS_COUNT) : null;
  const displayedProducts = currentPage ? products?.slice((DISPLAYED_PRODUCTS_COUNT * +currentPage - DISPLAYED_PRODUCTS_COUNT), (DISPLAYED_PRODUCTS_COUNT * +currentPage)) : null;

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
