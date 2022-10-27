import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../../store/store';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import App from './app';

jest.mock('../redirect/redirect', () => 'Redirect');
jest.mock('./app-router/app-router', () => 'AppRouter');

test('Render App', () => {
  const { asFragment } = renderWithReduxAndRouter(<App/>);
  expect(asFragment()).toMatchSnapshot();
});
