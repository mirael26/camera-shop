import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productsInCartMock } from '../../test/mocks';
import Cart from './cart';

jest.mock('./cart-product-card/cart-product-card', () => 'CartProductCard');
jest.mock('./cart-summary/cart-summary', () => 'CartSummary');

test('Cart component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Cart/>, { initialState: { cart: { productsInCart: productsInCartMock}}});
  expect(asFragment()).toMatchSnapshot();
});
