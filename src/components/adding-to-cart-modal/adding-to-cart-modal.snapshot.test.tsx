import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../test/mocks';
import AddingToCartModal from './adding-to-cart-modal';

jest.mock('./adding-to-cart-modal-card/adding-to-cart-modal-card', () => 'AddingToCartModalCard');
jest.mock('./adding-to-cart-modal-success/adding-to-cart-modal-success', () => 'AddingToCartModalSuccess');

test('AddingToCartModal renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<AddingToCartModal/>, { initialState: {
    cart: {
      addedToCartItem: productMock,
    }
  }});
  expect(asFragment()).toMatchSnapshot();
});
