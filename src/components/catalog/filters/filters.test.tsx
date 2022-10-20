import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import Filters from './filters';

test('Filters render correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Filters/>);
  expect(asFragment()).toMatchSnapshot();
});
