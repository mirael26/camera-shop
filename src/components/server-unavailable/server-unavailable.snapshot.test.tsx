import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import ServerUnavailable from './server-unavailable';

test('ServerUnavailable renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<ServerUnavailable/>);
  expect(asFragment()).toMatchSnapshot();
});
