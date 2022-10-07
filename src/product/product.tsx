import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RatingStars from '../components/rating-stars/rating-stars';
import { Modal } from '../consts';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { ActionCreator } from '../store/action';
import { loadCurrentProduct } from '../store/api-action';
import { addPriceSeparators } from '../utils';

const Product = (): JSX.Element => {
  const product = useAppSelector((state) => state.data.currentProduct);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(loadCurrentProduct(+id));
    }
  }, [id, dispatch]);

  const handleAddToCartButtonClick = () => {
    dispatch(ActionCreator.OpenModal(Modal.AddToCart));
    dispatch(ActionCreator.ChangeAddingToCartItem(product));
  };

  const adaptedPrice = product ? addPriceSeparators(product?.price) : null;

  return (
    <div className="page-content__section">
      {product &&
      <section className="product">
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
              <RatingStars rating={product.rating} size={'small'}/>
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
                <button className="tabs__control" type="button">Характеристики</button>
                <button className="tabs__control is-active" type="button">Описание</button>
              </div>
              <div className="tabs__content">
                <div className="tabs__element">
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
                <div className="tabs__element is-active">
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
