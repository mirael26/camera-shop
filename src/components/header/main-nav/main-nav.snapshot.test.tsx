import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import MainNav from './main-nav';

test('MainNav renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<MainNav/>);
  expect(asFragment()).toMatchSnapshot();
});
