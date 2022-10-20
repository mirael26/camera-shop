import { Modal } from '../../../../consts';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch';
import { useModalClose } from '../../../../hooks/use-modal-close';
import { ActionCreator } from '../../../../store/action';
import { IProduct } from '../../../../types/data.type';
import { addPriceSeparators } from '../../../../utils';

interface IAddToCartModalContentProps {
  product: IProduct;
}

const AddToCartModalContent = ({product}: IAddToCartModalContentProps) => {
  const dispatch = useAppDispatch();

  const cleanCallback = () => dispatch(ActionCreator.ChangeAddingToCartItem(null));
  const { onModalClose } = useModalClose({ modalName: Modal.AddToCart, cleanCallback });

  const handleOverlayClick = (evt: React.MouseEvent) => {
    const element = evt.target as Element;
    const isOverlay = element.classList.contains('modal__overlay');
    const isModal = element.classList.contains('modal__content');
    if (isOverlay && !isModal) {
      onModalClose();
    }
  };

  const adaptedPrice = product ? addPriceSeparators(product.price) : null;

  return (
    <div className="modal__wrapper" data-testid='add-to-cart-modal-content'>
      <div className="modal__overlay" data-testid='modal-overlay' onClick={handleOverlayClick}></div>
      <div className="modal__content" data-testid='modal-content'>
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
        <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onModalClose}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddToCartModalContent;
