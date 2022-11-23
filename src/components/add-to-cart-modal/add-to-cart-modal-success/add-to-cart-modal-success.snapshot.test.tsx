import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import AddToCartModalSuccess from './add-to-cart-modal-success';

test('AddToCartModalSuccess component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<AddToCartModalSuccess/>);
  expect(asFragment()).toMatchSnapshot();
});
