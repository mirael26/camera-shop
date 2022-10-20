import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Header from './header';

jest.mock('./main-nav/main-nav', () => 'MainNav');

test('Header renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Header/>);
  expect(asFragment()).toMatchSnapshot();
});
