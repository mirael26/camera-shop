import { fireEvent, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { AppUrl } from '../../../consts';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { ActionCreator } from '../../../store/action';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import AddingToCartModalSuccess from './adding-to-cart-modal-success';

jest.mock('../../../hooks/use-app-dispatch');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const dispatchSpy = jest.fn();
const navigateSpy = jest.fn();

describe('AddingToCartModalSuccess component', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(dispatchSpy);
    jest.mocked(useNavigate).mockReturnValue(navigateSpy);
  });
 
  test('closes modal and redirect on to-catalog-button click', () => {
    renderWithReduxAndRouter(<AddingToCartModalSuccess/>);

    fireEvent.click(screen.getByText(/Продолжить покупки/i));

    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.CloseModal());
    expect(navigateSpy).toHaveBeenCalledWith(AppUrl.Catalog);
  });

  test('closes modal and redirect to cart on to-cart-button click', () => {
    renderWithReduxAndRouter(<AddingToCartModalSuccess/>);

    fireEvent.click(screen.getByText(/Перейти в корзину/i));

    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.CloseModal());
    expect(navigateSpy).toHaveBeenCalledWith(`${AppUrl.Catalog}${AppUrl.Cart}`);
  });

  test('closes modal on close-button click', () => {
    renderWithReduxAndRouter(<AddingToCartModalSuccess/>);

    fireEvent.click(screen.getByLabelText(/Закрыть попап/i));

    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.CloseModal());
  });
});
