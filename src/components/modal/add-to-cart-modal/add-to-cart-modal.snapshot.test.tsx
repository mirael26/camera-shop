import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../../test/mocks';
import AddToCartModal from './add-to-cart-modal';

jest.mock('./add-to-cart-modal-content/add-to-cart-modal-content', () => 'AddToCartModalContent');

test('AddToCartModal renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<AddToCartModal/>, { initialState: {
    view: {
      addToCartModalOpen: true,
      addingToCartItem: productMock,
    }
  }});
  expect(asFragment()).toMatchSnapshot();
});
