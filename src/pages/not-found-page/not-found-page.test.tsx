import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import NotFoundPage from './not-found-page';

test('NotFoundPage render correctly', () => {
  const notFoundPage = renderWithReduxAndRouter(<NotFoundPage/>);
  expect(notFoundPage).toMatchSnapshot();
});
