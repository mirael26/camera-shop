import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productsInCartMock } from '../../../test/mocks';
import CartProductCard from './cart-product-card';

test('CartProductCard component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<CartProductCard product={productsInCartMock[0]}/>);
  expect(asFragment()).toMatchSnapshot();
});
