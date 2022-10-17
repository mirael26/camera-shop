import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../../store/store';
import App from './app';

test('Render App', () => {
  const app = render(
    <Provider store={createReduxStore({})}>
      <App />
    </Provider>
  );
  expect(app).toMatchSnapshot();
});
