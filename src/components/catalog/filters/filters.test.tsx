import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import Filters from './filters';

test('Filters render correctly', () => {
  const filters = renderWithReduxAndRouter(<Filters/>);
  expect(filters).toMatchSnapshot();
});
