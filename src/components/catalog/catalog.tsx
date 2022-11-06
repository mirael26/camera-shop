import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loadDisplayedProducts, loadFilteredProducts } from '../../store/api-action';
import Filters from '../filters/filters';
import Pagination from './pagination/pagination';
import Sorts from './sorts/sorts';
import { useSelector } from 'react-redux';
import { getAllProductsCount, getDisplayedProducts, getFilteredProductsCount, getProductsLoadingStatus } from '../../store/selectors';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductList from './product-list/product-list';
import { AppUrl, Param } from '../../consts';

const PRODUCTS_COUNT_ON_PAGE = 9;
const DEFAULT_PAGE = '1';

const Catalog = (): JSX.Element => {
  const displayedProducts = useSelector(getDisplayedProducts);
  const allProductsCount = useSelector(getAllProductsCount);
  const filteredProductsCount = useSelector(getFilteredProductsCount);
  const productsIsLoading = useSelector(getProductsLoadingStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (!params.has(Param.Page)) {
      params.set(Param.Page, DEFAULT_PAGE);
      navigate(`${AppUrl.Catalog}?${params.toString()}`, { replace: true });
      return;
    }

    const page = params.get(Param.Page);

    if (page) {
      const allQueryParams = new URLSearchParams(params); // создаем параметры для запроса со всеми опциями

      allQueryParams.delete(Param.Page);
      allQueryParams.append('_start', (PRODUCTS_COUNT_ON_PAGE * +page - PRODUCTS_COUNT_ON_PAGE).toString()); // вычисляем начало и конец диапазона товаров
      allQueryParams.append('_end', (PRODUCTS_COUNT_ON_PAGE * +page).toString());

      if (allQueryParams.has(Param.Sort)) {
        allQueryParams.append('_sort', allQueryParams.get(Param.Sort) as string);
        allQueryParams.delete(Param.Sort);
      }

      if (allQueryParams.has(Param.Order)) {
        allQueryParams.append('_order', allQueryParams.get(Param.Order) as string);
        allQueryParams.delete(Param.Order);
      }

      if (allQueryParams.has(Param.PriceMin)) {
        allQueryParams.append('price_gte', allQueryParams.get(Param.PriceMin) as string);
        allQueryParams.delete(Param.PriceMin);
      }

      if (allQueryParams.has(Param.PriceMax)) {
        allQueryParams.append('price_lte', allQueryParams.get(Param.PriceMax) as string);
        allQueryParams.delete(Param.PriceMax);
      }

      const isFiltersActive = params.has(Param.PriceMin) || params.has(Param.PriceMax) || params.has(Param.Category) || params.has(Param.Type) || params.has(Param.Level);
      if (isFiltersActive) { // если включены фильтры, нам нужно получить длину массива отфильтрованных товаров для пагинации
        const filterQueryParams = new URLSearchParams(allQueryParams); // создаем параметры только с фильтрами
        filterQueryParams.delete('_start'); // убираем ненужные параметры
        filterQueryParams.delete('_end');
        filterQueryParams.delete('_sort');
        filterQueryParams.delete('_order');

        dispatch(loadFilteredProducts(filterQueryParams)); // отправляем запрос отфильтрованных товаров
      }
      dispatch(loadDisplayedProducts(allQueryParams)); // отправляем запрос товаров, которые нужно вывести на страницу
    }
  }, [dispatch, navigate, params, setParams]);

  const productsCount = (filteredProductsCount === undefined) ? allProductsCount : filteredProductsCount;
  const pageCount = productsCount ? Math.ceil(productsCount / PRODUCTS_COUNT_ON_PAGE) : null;
  const catalogIsReady = !!allProductsCount;

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        {catalogIsReady &&
          <div className="page-content__columns" data-testid="catalog-content">
            <div className="catalog__aside">
              <Filters/>
            </div>

            {productsIsLoading
              ? <div className="catalog__loader" data-testid="catalog-loader"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
              : displayedProducts &&
                <div className="catalog__content">
                  <Sorts/>
                  {displayedProducts.length
                    ? <ProductList products={displayedProducts}/>
                    : <p className="title title--h2 catalog__nothing-found-message">Ничего не найдено</p>}

                  {pageCount && (pageCount > 1) && <Pagination pageCount={pageCount}/>}
                </div>}
          </div>}
      </div>
    </section>
  );
};

export default Catalog;
