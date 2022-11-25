import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../../test/mocks';
import AddingToCartModalCard from './adding-to-cart-modal-card';

test('AddingToCartModalCard component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<AddingToCartModalCard onSuccess={jest.fn()}/>, { initialState: { cart: { addedToCartItem: productMock }}});
  expect(asFragment()).toMatchSnapshot();
});
