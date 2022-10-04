import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loadProducts } from '../../store/api-action';
import Pagination from './pagination/pagination';
import ProductCard from './product-card/product-card';

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
              <div className="catalog-filter">
                <form action="#">
                  <h2 className="visually-hidden">Фильтр</h2>
                  <fieldset className="catalog-filter__block">
                    <legend className="title title--h5">Цена, ₽</legend>
                    <div className="catalog-filter__price-range">
                      <div className="custom-input">
                        <label>
                          <input type="number" name="price" placeholder="от"/>
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>
                          <input type="number" name="priceUp" placeholder="до"/>
                        </label>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="catalog-filter__block">
                    <legend className="title title--h5">Категория</legend>
                    <div className="custom-checkbox catalog-filter__item">
                      <label>
                        <input type="checkbox" name="photocamera" defaultChecked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
                      </label>
                    </div>
                    <div className="custom-checkbox catalog-filter__item">
                      <label>
                        <input type="checkbox" name="videocamera"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Видеокамера</span>
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="catalog-filter__block">
                    <legend className="title title--h5">Тип камеры</legend>
                    <div className="custom-checkbox catalog-filter__item">
                      <label>
                        <input type="checkbox" name="digital" defaultChecked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
                      </label>
                    </div>
                    <div className="custom-checkbox catalog-filter__item">
                      <label>
                        <input type="checkbox" name="film" disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
                      </label>
                    </div>
                    <div className="custom-checkbox catalog-filter__item">
                      <label>
                        <input type="checkbox" name="snapshot"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
                      </label>
                    </div>
                    <div className="custom-checkbox catalog-filter__item">
                      <label>
                        <input type="checkbox" name="collection" defaultChecked disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
                      </label>
                    </div>
                  </fieldset>
                  <fieldset className="catalog-filter__block">
                    <legend className="title title--h5">Уровень</legend>
                    <div className="custom-checkbox catalog-filter__item">
                      <label>
                        <input type="checkbox" name="zero" defaultChecked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
                      </label>
                    </div>
                    <div className="custom-checkbox catalog-filter__item">
                      <label>
                        <input type="checkbox" name="non-professional"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
                      </label>
                    </div>
                    <div className="custom-checkbox catalog-filter__item">
                      <label>
                        <input type="checkbox" name="professional"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
                      </label>
                    </div>
                  </fieldset>
                  <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
                  </button>
                </form>
              </div>
            </div>
            <div className="catalog__content">
              <div className="catalog-sort">
                <form action="#">
                  <div className="catalog-sort__inner">
                    <p className="title title--h5">Сортировать:</p>
                    <div className="catalog-sort__type">
                      <div className="catalog-sort__btn-text">
                        <input type="radio" id="sortPrice" name="sort" defaultChecked/>
                        <label htmlFor="sortPrice">по цене</label>
                      </div>
                      <div className="catalog-sort__btn-text">
                        <input type="radio" id="sortPopular" name="sort"/>
                        <label htmlFor="sortPopular">по популярности</label>
                      </div>
                    </div>
                    <div className="catalog-sort__order">
                      <div className="catalog-sort__btn catalog-sort__btn--up">
                        <input type="radio" id="up" name="sort-icon" defaultChecked aria-label="По возрастанию"/>
                        <label htmlFor="up">
                          <svg width="16" height="14" aria-hidden="true">
                            <use xlinkHref="#icon-sort"></use>
                          </svg>
                        </label>
                      </div>
                      <div className="catalog-sort__btn catalog-sort__btn--down">
                        <input type="radio" id="down" name="sort-icon" aria-label="По убыванию"/>
                        <label htmlFor="down">
                          <svg width="16" height="14" aria-hidden="true">
                            <use xlinkHref="#icon-sort"></use>
                          </svg>
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
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
