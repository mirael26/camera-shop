import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import ServerUnavailablePage from './server-unavailable-page';

test('ServerUnavailablePage render correctly', () => {
  const serverUnavailablePage = renderWithReduxAndRouter(<ServerUnavailablePage/>);
  expect(serverUnavailablePage).toMatchSnapshot();
});
