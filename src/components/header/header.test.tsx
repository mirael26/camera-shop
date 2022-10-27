import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Header from './header';

jest.mock('./main-nav/main-nav', () => 'MainNav');
jest.mock('../search/search', () => 'Search');

test('Header renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Header/>);
  expect(asFragment()).toMatchSnapshot();
});
