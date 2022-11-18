import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import ReviewModalForm from './review-modal-form';

test('ReviewModalForm component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<ReviewModalForm onSuccess={ jest.fn() }/>);
  expect(asFragment()).toMatchSnapshot();
});
