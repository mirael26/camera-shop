import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { loadProducts } from '../../store/api-action';
import Filters from './filters/filters';
import Pagination from './pagination/pagination';
import ProductCard from './product-card/product-card';
import Sorts from './sorts/sorts';

const Catalog = (): JSX.Element => {
  const products = useAppSelector((state) => state.data.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        {products &&
          <div className="page-content__columns">
            <div className="catalog__aside">
              <Filters/>
            </div>
            <div className="catalog__content">
              <Sorts/>
              <div className="cards catalog__cards">
                {products?.map((product, i) => {
                  const key = `product-card-${i}`;
                  return <ProductCard key={key} product={product} />;
                })}
              </div>
              <Pagination/>
            </div>
          </div>}
      </div>
    </section>
  );
};

export default Catalog;
