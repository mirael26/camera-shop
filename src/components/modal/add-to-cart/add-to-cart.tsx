import { useAppSelector } from '../../../hooks/hooks';
import { addPriceSeparators } from '../../../utils';

const AddToCart = (): JSX.Element | null => {
  const isOpen = useAppSelector((state) => state.state.addToCartModal);
  const product = useAppSelector((state) => state.state.addingToCartItem);

  const adaptedPrice = product ? addPriceSeparators(product.price) : null;

  return (
    isOpen && product
      ?
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay"></div>
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}/>
                  <img src={product.previewImg} srcSet={`${product.previewImg2x} 2x`} width="140" height="120" alt={`Фотоаппарат «${product.name}»`}/>
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{product.category} {product.name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{product.vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{product.category}</li>
                  <li className="basket-item__list-item">{product.level} уровень</li>
                </ul>
                <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{adaptedPrice} ₽</p>
              </div>
            </div>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>Добавить в корзину
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап">
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
      : null
  );
};

export default AddToCart;
