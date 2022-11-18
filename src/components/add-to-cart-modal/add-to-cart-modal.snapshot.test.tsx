import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../test/mocks';
import AddToCartModal from './add-to-cart-modal';

test('AddToCartModal renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<AddToCartModal/>, { initialState: {
    view: {
      addingToCartItem: productMock,
    }
  }});
  expect(asFragment()).toMatchSnapshot();
});
