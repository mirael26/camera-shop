import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Header from './header';

jest.mock('./main-nav/main-nav', () => 'MainNav');
jest.mock('../search/search', () => 'Search');
jest.mock('./cart-button/cart-button', () => 'CartButton');

test('Header renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Header/>);
  expect(asFragment()).toMatchSnapshot();
});
