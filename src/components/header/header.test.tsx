import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Header from './header';

test('Header render correctly', () => {
  const header = renderWithReduxAndRouter(<Header/>);
  expect(header).toMatchSnapshot();
});