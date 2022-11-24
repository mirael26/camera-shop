import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productsInCartMock } from '../../test/mocks';
import DeleteFromCartModal from './delete-from-cart-modal';

test('DeleteFromCartModal component', () => {
  const { asFragment } = renderWithReduxAndRouter(<DeleteFromCartModal/>, { initialState: { cart: { deletedFromCartItem: productsInCartMock[0]}}});
  expect(asFragment()).toMatchSnapshot();
});
