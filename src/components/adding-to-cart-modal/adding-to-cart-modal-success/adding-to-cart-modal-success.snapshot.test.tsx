import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import AddingToCartModalSuccess from './adding-to-cart-modal-success';

test('AddingToCartModalSuccess component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<AddingToCartModalSuccess/>);
  expect(asFragment()).toMatchSnapshot();
});
