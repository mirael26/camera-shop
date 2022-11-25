import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import RatingStars from '../rating-stars/rating-stars';
import { AppUrl, Modal, Param, Tab } from '../../consts';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';
import { loadCurrentProduct } from '../../store/api-action';
import { TTab } from '../../types/app.type';
import { addPriceSeparators } from '../../utils';
import { getCurrentProduct } from '../../store/selectors';
import { useSelector } from 'react-redux';

export const DEFAULT_TAB = Tab.Description;

const Product = (): JSX.Element => {
  const product = useSelector(getCurrentProduct);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (id) {
      dispatch(loadCurrentProduct(+id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!params.has(Param.Tab) && id) { // если таб не установлен - установить таб по умолчанию
      params.set(Param.Tab, DEFAULT_TAB);
      navigate(`${AppUrl.Catalog}${AppUrl.Product}/${id}?${params.toString()}`, { replace: true });
      return;
    }

    const tab = params.get(Param.Tab);
    const existingTabs: Array<string> = Object.values(Tab); // если таб есть, находим список существующих табов
    const isTabExisting = tab ? existingTabs.includes(tab) : false; // проверяем, есть ли таб в списке существующих

    if (!isTabExisting) {
      navigate(AppUrl.NotFound); // если таб не существует, делаем редирект на страницу 404
    }
  }, [id, navigate, params, setParams]);

  const handleAddToCartButtonClick = () => {
    dispatch(ActionCreator.OpenModal(Modal.AddingToCart));
    dispatch(ActionCreator.SetAddedToCartItem(product));
  };

  const handleTabControlButtonClick = (newTab: TTab) => {
    setParams({tab: newTab});
  };

  const adaptedPrice = product ? addPriceSeparators(product?.price) : null;
  const tab = params.get(Param.Tab);

  return (
    <div className="page-content__section">
      {product && id &&
      <section className="product" data-testid='product'>
        <div className="container">
          <div className="product__img">
            <picture>
              <source type="image/webp" srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}/>
              <img src={product.previewImg} srcSet={`${product.previewImg2x} 2x`} width="560" height="480" alt={`${product.previewImgWebp} ${product.previewImgWebp2x}`}/>
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{product.name}</h1>
            <div className="rate product__rate">
              <RatingStars rating={product.rating}/>
              <p className="visually-hidden">Рейтинг: {product.rating}</p>
              <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
            </div>
            <p className="product__price"><span className="visually-hidden">Цена:</span>{adaptedPrice} ₽</p>
            <button className="btn btn--purple" type="button" onClick={handleAddToCartButtonClick}>
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
            <div className="tabs product__tabs">
              <div className="tabs__controls product__tabs-controls">
                <button className={`tabs__control${tab === Tab.Features ? ' is-active' : ''}`} onClick={() => handleTabControlButtonClick(Tab.Features)}>
                  Характеристики
                </button>
                <button className={`tabs__control${tab === Tab.Description ? ' is-active' : ''}`} onClick={() => handleTabControlButtonClick(Tab.Description)}>
                  Описание
                </button>
              </div>
              <div className="tabs__content">
                <div className={`tabs__element${tab === Tab.Features ? ' is-active' : ''}`} data-testid='features-content'>
                  <ul className="product__tabs-list">
                    <li className="item-list"><span className="item-list__title">Артикул:</span>
                      <p className="item-list__text"> {product.vendorCode}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Категория:</span>
                      <p className="item-list__text">{product.category}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                      <p className="item-list__text">{product.type}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Уровень:</span>
                      <p className="item-list__text">{product.level}</p>
                    </li>
                  </ul>
                </div>
                <div className={`tabs__element${tab === Tab.Description ? ' is-active' : ''}`} data-testid='description-content'>
                  <div className="product__tabs-text">
                    {product.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}
    </div>
  );
};

export default Product;
