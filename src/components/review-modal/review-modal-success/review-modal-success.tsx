import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { ActionCreator } from '../../../store/action';

const ReviewModalSuccess = () => {
  const dispatch = useAppDispatch();

  const handleContinueButtonClick = () => {
    dispatch(ActionCreator.CloseModal());
    window.location.reload();
  };

  return (
    <>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleContinueButtonClick}>Вернуться к покупкам
        </button>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(ActionCreator.CloseModal())}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
};

export default ReviewModalSuccess;
