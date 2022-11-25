import { fireEvent, screen } from '@testing-library/react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { ActionCreator } from '../../../store/action';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../../test/mocks';
import AddingToCartModalCard from './adding-to-cart-modal-card';

jest.mock('../../../hooks/use-app-dispatch');

const dispatchSpy = jest.fn();
const onSuccessSpy = jest.fn();

describe('AddingToCartModalCard component', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(dispatchSpy);
  });
 
  test('adds product to cart on add-button click', () => {
    renderWithReduxAndRouter(<AddingToCartModalCard onSuccess={onSuccessSpy}/>, { initialState: { cart: { addedToCartItem: productMock }}});

    fireEvent.click(screen.getByText(/Добавить в корзину/i));

    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.AddProductToCart(productMock));
    expect(onSuccessSpy).toHaveBeenCalled();
  });

  test('closes modal on close-button click', () => {
    renderWithReduxAndRouter(<AddingToCartModalCard onSuccess={onSuccessSpy}/>, { initialState: { cart: { addedToCartItem: productMock }}});

    fireEvent.click(screen.getByLabelText(/Закрыть попап/i));

    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.CloseModal());
  });
});
