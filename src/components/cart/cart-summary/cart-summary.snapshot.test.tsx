import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productsInCartMock } from '../../../test/mocks';
import CartSummary from './cart-summary';

jest.mock('../promocode/promocode', () =>'Promocode');

test('CartSummary component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<CartSummary/>, { initialState: { cart: { productsInCart: productsInCartMock}}});
  expect(asFragment()).toMatchSnapshot();
});
