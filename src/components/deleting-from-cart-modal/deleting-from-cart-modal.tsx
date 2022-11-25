import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';
import { getDeletedFromCartItem } from '../../store/selectors';

const DeletingFromCartModal = () => {
  const deletedProduct = useSelector(getDeletedFromCartItem);
  const dispatch = useAppDispatch();

  const handleDeleteButtonCLick = () => {
    if (deletedProduct) {
      dispatch(ActionCreator.DeleteProductFromCart(deletedProduct.id));
    }
    dispatch(ActionCreator.CloseModal());
  };

  return (
    deletedProduct &&
    <div className="modal__content">
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`${deletedProduct.previewImgWebp}, ${deletedProduct.previewImgWebp2x} 2x`}/>
            <img src={deletedProduct.previewImg} srcSet={`${deletedProduct.previewImg2x} 2x`} width="140" height="120" alt={deletedProduct.name}/>
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{deletedProduct.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{deletedProduct.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{deletedProduct.type} {deletedProduct.category.toLowerCase()}</li>
            <li className="basket-item__list-item">{deletedProduct.level} уровень</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleDeleteButtonCLick}>Удалить
        </button>
        <button className="btn btn--transparent modal__btn modal__btn--half-width" onClick={() => dispatch(ActionCreator.CloseModal())}>Продолжить покупки
        </button>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(ActionCreator.CloseModal())}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
};

export default DeletingFromCartModal;
