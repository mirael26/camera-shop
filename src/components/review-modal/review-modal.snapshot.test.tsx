import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import ReviewModal from './review-modal';

jest.mock('./review-modal-form/review-modal-form', () => 'ReviewModalForm');

test('ReviewModal renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<ReviewModal/>);

  expect(asFragment()).toMatchSnapshot();
});
