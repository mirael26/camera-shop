import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import RatingStars from '../rating-stars/rating-stars';
import { AppUrl, Modal, Tab } from '../../consts';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ActionCreator } from '../../store/action';
import { loadCurrentProduct } from '../../store/api-action';
import { TTab } from '../../types/app.type';
import { addPriceSeparators } from '../../utils';

const DEFAULT_TAB = Tab.Description;

const Product = (): JSX.Element => {
  const product = useAppSelector((state) => state.data.currentProduct);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, tab } = useParams();

  const [currentTab, setCurrentTab] = useState<TTab>(DEFAULT_TAB);

  useEffect(() => {
    if (id) {
      dispatch(loadCurrentProduct(+id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!tab && id) {
      navigate(`${AppUrl.Catalog}${AppUrl.Product}/${id}/${currentTab}`, {replace: true});
    }
  }, []);

  useEffect(() => {
    if (tab && tab !== currentTab) {
      if (!Object.values(Tab).some((el) => el === tab)) {
        navigate(AppUrl.NotFound);
      }
      setCurrentTab(tab as TTab);
    }
  }, [tab]);

  const handleAddToCartButtonClick = () => {
    dispatch(ActionCreator.OpenModal(Modal.AddToCart));
    dispatch(ActionCreator.ChangeAddingToCartItem(product));
  };

  const adaptedPrice = product ? addPriceSeparators(product?.price) : null;

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
                <Link className={`tabs__control${currentTab === Tab.Features ? ' is-active' : ''}`} to={`${AppUrl.Catalog}${AppUrl.Product}/${id}/${Tab.Features}`}>
                  Характеристики
                </Link>
                <Link className={`tabs__control${currentTab === Tab.Description ? ' is-active' : ''}`} to={`${AppUrl.Catalog}${AppUrl.Product}/${id}/${Tab.Description}`}>
                  Описание
                </Link>
              </div>
              <div className="tabs__content">
                <div className={`tabs__element${currentTab === Tab.Features ? ' is-active' : ''}`} data-testid='features-content'>
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
                <div className={`tabs__element${currentTab === Tab.Description ? ' is-active' : ''}`} data-testid='description-content'>
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
