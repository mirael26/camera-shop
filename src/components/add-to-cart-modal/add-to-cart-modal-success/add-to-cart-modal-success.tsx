import { useNavigate } from 'react-router-dom';
import { AppUrl } from '../../../consts';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { ActionCreator } from '../../../store/action';

const AddToCartModalSuccess = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToCatalogButtonClick = () => {
    dispatch(ActionCreator.CloseModal());
    navigate(AppUrl.Catalog);
  };

  const handleToCartButtonClick = () => {
    dispatch(ActionCreator.CloseModal());
    navigate(AppUrl.Cart);
  };

  return(
    <>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <button className="btn btn--transparent modal__btn" onClick={handleToCatalogButtonClick}>Продолжить покупки</button>
        <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleToCartButtonClick}>Перейти в корзину</button>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(ActionCreator.CloseModal())}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
};

export default AddToCartModalSuccess;
