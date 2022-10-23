import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../../store/store';
import App from './app';

jest.mock('../redirect/redirect', () => 'Redirect');
jest.mock('./app-router/app-router', () => 'AppRouter');

test('Render App', () => {
  const { asFragment } = render(
    <Provider store={createReduxStore({})}>
      <App />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
