import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { loadProducts } from '../../store/api-action';
import Filters from './filters/filters';
import Pagination from './pagination/pagination';
import ProductCard from '../product-card/product-card';
import Sorts from './sorts/sorts';

const DISPLAYED_PRODUCTS_COUNT = 9;

const Catalog = (): JSX.Element => {
  const products = useAppSelector((state) => state.data.products);
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  const pageCount = products ? Math.ceil(products.length / DISPLAYED_PRODUCTS_COUNT) : null;
  const displayedProducts = products?.slice((DISPLAYED_PRODUCTS_COUNT * currentPage - DISPLAYED_PRODUCTS_COUNT), (DISPLAYED_PRODUCTS_COUNT * currentPage));

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
              {pageCount && (pageCount > 1) && <Pagination pageCount={pageCount} changeCurrentPage={setCurrentPage} />}
            </div>
          </div>}
      </div>
    </section>
  );
};

export default Catalog;
