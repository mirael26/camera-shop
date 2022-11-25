import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { ActionCreator } from '../../../store/action';
import { postPromocode } from '../../../store/api-action';
import { getPromocodeConfirmed } from '../../../store/selectors';

const Promocode = () => {
  const isPromocodeConfirmed = useSelector(getPromocodeConfirmed);
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setInputValid] = useState<boolean | null>(null);

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (inputValue === '') {
      dispatch(ActionCreator.SetPromocode(null));
      dispatch(ActionCreator.ChangePromocodeConfirmed(null));
      dispatch(ActionCreator.SetDiscount(0));
      setInputValid(null);
      return;
    }

    const isPromocodeValid = /^[A-Za-zА-Яа-я0-9-]+$/.test(inputValue);

    if (isPromocodeValid) {
      dispatch(postPromocode(inputValue));
      setInputValid(true);
    } else {
      dispatch(ActionCreator.SetPromocode(null));
      dispatch(ActionCreator.ChangePromocodeConfirmed(null));
      dispatch(ActionCreator.SetDiscount(0));
      setInputValid(false);
    }
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValid(null);
    if (isPromocodeConfirmed !== null) {
      dispatch(ActionCreator.ChangePromocodeConfirmed(null));
    }
    setInputValue(evt.target.value.trim());
  };

  return(
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form action="#" onSubmit={handleFormSubmit}>
          <div
            className={`custom-input${isPromocodeConfirmed ? ' is-valid' : ''}${isInputValid === false || isPromocodeConfirmed === false ? ' is-invalid' : ''}`}
            data-testid='promocode-container'
          >
            <label><span className="custom-input__label">Промокод</span>
              <input type="text" name="promo" placeholder="Введите промокод"
                value={inputValue}
                onChange={handleInputChange}
              />
            </label>
            {isInputValid === false && <p className="custom-input__error">Неверный формат</p>}
            {isPromocodeConfirmed === false && <p className="custom-input__error">Промокод неверный</p>}
            {isPromocodeConfirmed && <p className="custom-input__success">Промокод принят!</p>}
          </div>
          <button className="btn" type="submit">Применить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Promocode;
