import { Modal as ModalType } from '../../consts';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Modal from './modal';

jest.mock('../adding-to-cart-modal/adding-to-cart-modal', () => 'AddingToCartModal');

test('Modal renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Modal/>, { initialState: {
    view: {
      isModalOpen: true,
      activeModal: ModalType.AddingToCart,
    }
  }});
  expect(asFragment()).toMatchSnapshot();
});
