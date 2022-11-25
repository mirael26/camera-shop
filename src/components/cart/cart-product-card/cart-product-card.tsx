import { useRef, useState } from 'react';
import { Modal } from '../../../consts';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { ActionCreator } from '../../../store/action';
import { IProductInCart } from '../../../types/data.type';
import { addPriceSeparators } from '../../../utils';

export const ProductsCount = {
  Min: 1,
  Max: 99,
} as const;

interface ICartProductCardProps {
  product: IProductInCart;
}

const CartProductCard = ({ product }: ICartProductCardProps) => {
  const dispatch = useAppDispatch();

  const [countValue, setCountValue] = useState(product.countInCart);
  const refInput = useRef<HTMLInputElement>(null);

  const setCount = (evt: FocusEvent) => {
    const value = +(evt.target as HTMLInputElement).value;

    if (value <= ProductsCount.Min) {
      setCountValue(ProductsCount.Min);
      dispatch(ActionCreator.ChangeProductCountInCart(product.id, ProductsCount.Min));
    } else
    if (value >= ProductsCount.Max) {
      setCountValue(ProductsCount.Max);
      dispatch(ActionCreator.ChangeProductCountInCart(product.id, ProductsCount.Max));
    } else {
      dispatch(ActionCreator.ChangeProductCountInCart(product.id, value));
    }

    refInput.current?.removeEventListener('blur', setCount);
    document.removeEventListener('keydown', handleInputEnterKeydown);
  };

  const handleInputEnterKeydown = (keydownEvt: KeyboardEvent) => {
    if (keydownEvt.key === 'Enter') {
      refInput.current?.blur();
    }
  };

  const handleInputFocus = () => {
    refInput.current?.addEventListener('blur', setCount);
    document.addEventListener('keydown', handleInputEnterKeydown);
  };

  const handleDecreaseButtonClick = () => {
    setCountValue(product.countInCart - 1);
    dispatch(ActionCreator.ChangeProductCountInCart(product.id, product.countInCart - 1));
  };

  const handleIncreaseButtonClick = () => {
    setCountValue(product.countInCart + 1);
    dispatch(ActionCreator.ChangeProductCountInCart(product.id, product.countInCart + 1));
  };

  const handleDeleteButtonClick = () => {
    dispatch(ActionCreator.SetDeletedFromCartItem(product));
    dispatch(ActionCreator.OpenModal(Modal.DeleteFromCart));
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}/>
          <img src={product.previewImg} srcSet={`${product.previewImg2x} 2x`} width="140" height="120" alt={product.name}/>
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{product.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{product.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{product.type} {product.category.toLowerCase()}</li>
          <li className="basket-item__list-item">{product.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{addPriceSeparators(product.price)} ₽</p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара"
          disabled={product.countInCart === ProductsCount.Min}
          onClick={handleDecreaseButtonClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" min="1" max="99" aria-label="количество товара"
          ref={refInput}
          value={countValue}
          onChange={(evt) => setCountValue(+evt.target.value)}
          onFocus={handleInputFocus}
        />
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара"
          disabled={product.countInCart === ProductsCount.Max}
          onClick={handleIncreaseButtonClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price" data-testid='total-price'><span className="visually-hidden">Общая цена:</span>{addPriceSeparators(product.price * product.countInCart)} ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={handleDeleteButtonClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
};

export default CartProductCard;
