import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import CartButton from './cart-button';

test('CartButton component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<CartButton/>);
  expect(asFragment()).toMatchSnapshot();
});
