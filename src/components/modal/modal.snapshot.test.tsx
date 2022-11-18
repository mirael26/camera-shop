import { Modal as ModalType } from '../../consts';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Modal from './modal';

jest.mock('../add-to-cart-modal/add-to-cart-modal', () => 'AddToCartModalContent');

test('Modal renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Modal/>, { initialState: {
    view: {
      isModalOpen: true,
      activeModal: ModalType.AddToCart,
    }
  }});
  expect(asFragment()).toMatchSnapshot();
});
