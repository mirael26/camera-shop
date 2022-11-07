import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import Sorts from './sorts';

test('Sorts render correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Sorts/>);
  expect(asFragment()).toMatchSnapshot();
});
