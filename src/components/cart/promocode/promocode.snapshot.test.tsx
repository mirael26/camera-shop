import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import Promocode from './promocode';

test('Promocode component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Promocode/>);
  expect(asFragment()).toMatchSnapshot();
});
