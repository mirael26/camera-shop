import { renderWithRedux } from '../../test/helpers/renderWithRedux';
import App from './app';

test('Render App', () => {
  const app = renderWithRedux(<App />);
  expect(app).toMatchSnapshot();
});
