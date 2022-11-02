import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Param } from '../../../consts';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { loadDisplayedProducts } from '../../../store/api-action';
import { getDisplayedProducts } from '../../../store/selectors';
import ProductCard from '../../product-card/product-card';

interface IProductListProps {
  productsCountOnPage: number;
}

const ProductList = ({productsCountOnPage}: IProductListProps) => {
  const [params, setParams] = useSearchParams();
  const displayedProducts = useSelector(getDisplayedProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const page = params.get(Param.Page);

    if (page) {
      const queryParams: {[key: string]: string | null} = { // подготавливаем параметры для запроса списка товаров
        _sort: params.get(Param.Sort),
        _order: params.get(Param.Order),
        _start: (productsCountOnPage * +page - productsCountOnPage).toString(), // вычисляем начало и конец диапазона товаров, либо возвращаем null
        _end: (productsCountOnPage * +page).toString(),
        'price_gte': params.get(Param.PriceMin),
        'price_lte': params.get(Param.PriceMax),
      };

      dispatch(loadDisplayedProducts(queryParams)); // загружаем товары, которые нужно вывести на страницу
    }
  }, [dispatch, params, setParams]);

  return (
    <div className="cards catalog__cards">
      {displayedProducts?.map((product, i) => {
        const key = `product-card-${i}`;
        return <ProductCard key={key} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
