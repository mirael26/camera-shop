import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import OrderSuccessModal from './order-success-modal';

test('OrderSuccessModal component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<OrderSuccessModal/>);
  expect(asFragment()).toMatchSnapshot();
});
