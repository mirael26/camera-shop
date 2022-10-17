import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../../test/mocks';
import AddToCartModal from './add-to-cart';


describe('AddToCart', () => {
  test('Render correctly', () => {
    const addToCart = renderWithReduxAndRouter(<AddToCartModal/>);
    expect(addToCart).toMatchSnapshot();
  });

  test('Open modal-content correctly', () => {
    renderWithReduxAndRouter(<AddToCartModal/>, { initialState: {
      state: {
        addToCartModalOpen: true,
        addingToCartItem: productMock,
      }
    }});

    const addToCart = screen.getByTestId('add-to-cart-modal');
    expect(addToCart).toHaveClass('is-active');

    const addToCartModalContent = screen.getByTestId('add-to-cart-modal-content');
    expect(addToCartModalContent).toBeInTheDocument();
  });
});
