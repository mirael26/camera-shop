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
      const queryParams = new URLSearchParams(params);

      queryParams.delete(Param.Page);
      queryParams.append('_start', (productsCountOnPage * +page - productsCountOnPage).toString()); // вычисляем начало и конец диапазона товаров
      queryParams.append('_end', (productsCountOnPage * +page).toString());

      if (queryParams.has(Param.Sort)) {
        queryParams.append('_sort', queryParams.get(Param.Sort) as string);
        queryParams.delete(Param.Sort);
      }

      if (queryParams.has(Param.Order)) {
        queryParams.append('_order', queryParams.get(Param.Order) as string);
        queryParams.delete(Param.Order);
      }

      if (queryParams.has(Param.PriceMin)) {
        queryParams.append('price_gte', queryParams.get(Param.PriceMin) as string);
        queryParams.delete(Param.PriceMin);
      }

      if (queryParams.has(Param.PriceMax)) {
        queryParams.append('price_lte', queryParams.get(Param.PriceMax) as string);
        queryParams.delete(Param.PriceMax);
      }

      dispatch(loadDisplayedProducts(queryParams)); // отправляем запрос товаров, которые нужно вывести на страницу
    }
  }, [dispatch, params, setParams, productsCountOnPage]);

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
