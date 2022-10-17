import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import Sorts from './sorts';

test('Sorts render correctly', () => {
  const sorts = renderWithReduxAndRouter(<Sorts/>);
  expect(sorts).toMatchSnapshot();
});
