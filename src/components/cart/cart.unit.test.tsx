import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productsInCartMock } from '../../test/mocks';
import Cart from './cart';

jest.mock('./cart-product-card/cart-product-card', () => () => <div data-testid='cart-product-card'></div>);
jest.mock('./cart-summary/cart-summary', () => 'CartSummary');

describe('Cart component', () => {
  test('renders products correctly', () => {
    renderWithReduxAndRouter(<Cart/>, { initialState: { cart: { productsInCart: productsInCartMock}}});

    expect(screen.getAllByTestId('cart-product-card')).toHaveLength(2);
  });
  
  test('does not render products if no products in cart and renders message instead', () => {
    renderWithReduxAndRouter(<Cart/>, { initialState: { cart: { productsInCart: []}}});

    expect(screen.queryAllByTestId('cart-product-card')).toHaveLength(0);
    expect(screen.getByText(/Корзина пуста/i)).toBeInTheDocument();
  });
});
