import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import UnknownErrorPage from './unknown-error-page';

test('UnknownErrorPage renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<UnknownErrorPage/>);
  expect(asFragment()).toMatchSnapshot();
});
