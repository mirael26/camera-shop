import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import App from './app';

jest.mock('../redirect/redirect', () => 'Redirect');
jest.mock('./app-router/app-router', () => 'AppRouter');

test('App component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<App/>);
  expect(asFragment()).toMatchSnapshot();
});
