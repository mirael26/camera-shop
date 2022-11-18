import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import ReviewModalSuccess from './review-modal-success';

test('ReviewModalSuccess renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<ReviewModalSuccess/>);
  expect(asFragment()).toMatchSnapshot();
});
