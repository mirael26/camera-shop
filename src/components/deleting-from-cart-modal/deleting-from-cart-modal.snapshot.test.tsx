import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productsInCartMock } from '../../test/mocks';
import DeletingFromCartModal from './deleting-from-cart-modal';

test('DeletingFromCartModal component', () => {
  const { asFragment } = renderWithReduxAndRouter(<DeletingFromCartModal/>, { initialState: { cart: { deletedFromCartItem: productsInCartMock[0]}}});
  expect(asFragment()).toMatchSnapshot();
});
