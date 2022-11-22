import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../test/mocks';
import AddToCartModal from './add-to-cart-modal';

jest.mock('./add-to-cart-modal-card/add-to-cart-modal-card', () => 'AddToCartModalCard');
jest.mock('./add-to-cart-modal-success/add-to-cart-modal-success', () => 'AddToCartModalSuccess');

test('AddToCartModal renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<AddToCartModal/>, { initialState: {
    cart: {
      addedToCartItem: productMock,
    }
  }});
  expect(asFragment()).toMatchSnapshot();
});
