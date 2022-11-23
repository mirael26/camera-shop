import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import CartPage from './cart-page';

jest.mock('../../components/header/header', () => 'Header');
jest.mock('../../components/breadcrumbs/breadcrumbs', () => 'Breadcrumbs');
jest.mock('../../components/footer/footer', () => 'Footer');
jest.mock('../../components/modal/modal', () => 'Modal');
jest.mock('../../components/cart/cart', () => 'Cart');

test('CartPage renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<CartPage/>);
  expect(asFragment()).toMatchSnapshot();
});
