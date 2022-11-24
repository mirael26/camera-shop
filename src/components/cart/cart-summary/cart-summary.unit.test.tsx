import { fireEvent, screen } from '@testing-library/react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { postOrder } from '../../../store/api-action';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productsInCartMock } from '../../../test/mocks';
import CartSummary from './cart-summary';

jest.mock('../promocode/promocode', () =>'Promocode');

jest.mock('../../../hooks/use-app-dispatch');
jest.mock('../../../store/api-action', () => ({
  postOrder: jest.fn()
}));

describe('CartSummary component', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(jest.fn());
  });

  test('calculates correct summary', () => {
    renderWithReduxAndRouter(<CartSummary/>, { initialState: { cart: { productsInCart: productsInCartMock}}});

    expect(screen.getByTestId('total').textContent).toContain('469 940');
  });

  test('renders correct discount and calculates correct total with discount', () => {
    renderWithReduxAndRouter(<CartSummary/>, { initialState: { cart: { productsInCart: productsInCartMock, discount: 0.10}}});

    expect(screen.getByTestId('total').textContent).toContain('469 940');
    expect(screen.getByTestId('discount-amount').textContent).toContain('46 994');
    expect(screen.getByTestId('total-with-discount').textContent).toContain('422 946');
  });

  test('renders zero if there is no discount', () => {
    renderWithReduxAndRouter(<CartSummary/>, { initialState: { cart: { productsInCart: productsInCartMock, discount: null}}});

    expect(screen.getByTestId('discount-amount').textContent).toContain('0');
  });

  test('renders zero if no discount', () => {
    renderWithReduxAndRouter(<CartSummary/>, { initialState: { cart: { productsInCart: productsInCartMock, promocode: 'abc'}}});
    const orderMock = {camerasIds: [7, 5], coupon: 'abc'};

    fireEvent.click(screen.getByText(/Оформить заказ/i));

    expect(postOrder).toHaveBeenCalledWith(orderMock);
  });
});
