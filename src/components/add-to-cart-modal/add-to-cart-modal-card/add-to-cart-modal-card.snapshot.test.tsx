import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../../test/mocks';
import AddToCartModalCard from './add-to-cart-modal-card';

test('AddToCartModalCard component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<AddToCartModalCard onSuccess={jest.fn()}/>, { initialState: { cart: { addedToCartItem: productMock }}});
  expect(asFragment()).toMatchSnapshot();
});
