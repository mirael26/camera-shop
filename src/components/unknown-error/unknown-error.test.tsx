import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import UnknownError from './unknown-error';

test('UnknownError component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<UnknownError/>);
  expect(asFragment()).toMatchSnapshot();
});
