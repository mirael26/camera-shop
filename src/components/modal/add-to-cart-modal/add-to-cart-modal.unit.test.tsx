import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../../test/mocks';
import AddToCartModal from './add-to-cart-modal';

jest.mock('./add-to-cart-modal-content/add-to-cart-modal-content', () => () => (<div data-testid='add-to-cart-modal-content'></div>));

test('AddToCartModal opens modal-content correctly', () => {
  renderWithReduxAndRouter(<AddToCartModal/>, { initialState: {
    state: {
      addToCartModalOpen: true,
      addingToCartItem: productMock,
    }
  }});

  expect(screen.getByTestId('add-to-cart-modal')).toHaveClass('is-active');

  expect(screen.getByTestId('add-to-cart-modal-content')).toBeInTheDocument();
});
