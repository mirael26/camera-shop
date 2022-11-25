import { fireEvent, screen } from '@testing-library/react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productsInCartMock } from '../../test/mocks';
import DeletingFromCartModal from './deleting-from-cart-modal';

jest.mock('../../hooks/use-app-dispatch');

const dispatchSpy = jest.fn();

describe('DeletingFromCartModal component', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(dispatchSpy);
  });

  test('should delete button on delete-button click', () => {
    renderWithReduxAndRouter(<DeletingFromCartModal/>, { initialState: { cart: { deletedFromCartItem: productsInCartMock[0]}}});
    
    fireEvent.click(screen.getByText('Удалить'));
  
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, ActionCreator.DeleteProductFromCart(productsInCartMock[0].id));
    expect(dispatchSpy).toHaveBeenNthCalledWith(2, ActionCreator.CloseModal());
  });

  test('should close modal on return-to-shopping-button click', () => {
    renderWithReduxAndRouter(<DeletingFromCartModal/>, { initialState: { cart: { deletedFromCartItem: productsInCartMock[0]}}});
    
    fireEvent.click(screen.getByText('Продолжить покупки'));
  
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.CloseModal());
  });

  test('should close modal on close-button click', () => {
    renderWithReduxAndRouter(<DeletingFromCartModal/>, { initialState: { cart: { deletedFromCartItem: productsInCartMock[0]}}});
    
    fireEvent.click(screen.getByLabelText('Закрыть попап'));
  
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.CloseModal());
  });
});
