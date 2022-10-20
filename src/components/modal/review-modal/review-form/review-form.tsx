import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch';
import { postReview } from '../../../../store/api-action';

interface IReviewFormProps {
  onSuccess: () => void;
  onModalClose: () => void;
}

type TInputName = 'rating' | 'userName' | 'advantage' | 'disadvantage' | 'review';

const ReviewForm = ({ onSuccess, onModalClose }: IReviewFormProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [inputValue, setInputValue] = useState({rating: '', userName: '', advantage: '', disadvantage: '', review: ''});
  const [inputValidity, setInputValidity] = useState({rating: true, userName: true, advantage: true, disadvantage: true, review: true});

  const checkFormValidity = () => {
    let isFormValid = true;
    Object.keys(inputValue).forEach((input) => {
      if (inputValue[input as TInputName] === '') {
        setInputValidity((prevState) => ({...prevState, [input as TInputName]: false}));
        isFormValid = false;
      }
    });
    return isFormValid;
  };

  const handleInputChange = (evt: React.SyntheticEvent, inputName: TInputName) => {
    setInputValidity((prevState) => ({...prevState, [inputName]: true}));
    const value = (evt.target as HTMLInputElement).value;
    setInputValue((prevState) => ({...prevState, [inputName]: value}));
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isFormValid = checkFormValidity();

    if (isFormValid && id) {
      const reviewInfo = {...inputValue, rating: +inputValue.rating, cameraId: +id};
      dispatch(postReview(reviewInfo));
      onSuccess();
    }
  };

  return (
    <div className="modal__content" data-testid='review-form'>
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form method="post" onSubmit={handleFormSubmit} data-testid='form'>
          <div className="form-review__rate">
            <fieldset className={`rate form-review__item${inputValidity.rating ? '' : ' is-invalid'}`} data-testid='rating-input-block'>
              <legend className="rate__caption">Рейтинг
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5" onChange={(evt) => handleInputChange(evt, 'rating')}/>
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4" onChange={(evt) => handleInputChange(evt, 'rating')}/>
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3" onChange={(evt) => handleInputChange(evt, 'rating')}/>
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2" onChange={(evt) => handleInputChange(evt, 'rating')}/>
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1" onChange={(evt) => handleInputChange(evt, 'rating')}/>
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                </div>
                <div className="rate__progress"><span className="rate__stars" data-testid='review-form-rate'>{inputValue.rating === '' ? 0 : inputValue.rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message">Нужно оценить товар</p>
            </fieldset>
            <div className={`custom-input form-review__item${inputValidity.userName ? '' : ' is-invalid'}`} data-testid='name-input-block'>
              <label>
                <span className="custom-input__label">Ваше имя
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text" name="user-name" placeholder="Введите ваше имя" value={inputValue.userName} onChange={(evt) => handleInputChange(evt, 'userName')}/>
              </label>
              <p className="custom-input__error">Нужно указать имя</p>
            </div>
            <div className={`custom-input form-review__item${inputValidity.advantage ? '' : ' is-invalid'}`} data-testid='advantage-input-block'>
              <label>
                <span className="custom-input__label">Достоинства
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text" name="user-plus" placeholder="Основные преимущества товара" value={inputValue.advantage} onChange={(evt) => handleInputChange(evt, 'advantage')}/>
              </label>
              <p className="custom-input__error">Нужно указать достоинства</p>
            </div>
            <div className={`custom-input form-review__item${inputValidity.disadvantage ? '' : ' is-invalid'}`} data-testid='disadvantage-input-block'>
              <label>
                <span className="custom-input__label">Недостатки
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text" name="user-minus" placeholder="Главные недостатки товара" value={inputValue.disadvantage} onChange={(evt) => handleInputChange(evt, 'disadvantage')}/>
              </label>
              <p className="custom-input__error">Нужно указать недостатки</p>
            </div>
            <div className={`custom-textarea form-review__item${inputValidity.review ? '' : ' is-invalid'}`} data-testid='review-input-block'>
              <label>
                <span className="custom-textarea__label">Комментарий
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea name="user-comment" minLength={5} placeholder="Поделитесь своим опытом покупки" value={inputValue.review} onChange={(evt) => handleInputChange(evt, 'review')}></textarea>
              </label>
              <div className="custom-textarea__error">Нужно добавить комментарий</div>
            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
        </form>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onModalClose}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
};

export default ReviewForm;
