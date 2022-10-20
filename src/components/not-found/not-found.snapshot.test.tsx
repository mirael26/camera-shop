import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import NotFound from './not-found';

test('NotFound renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<NotFound/>);
  expect(asFragment()).toMatchSnapshot();
});
