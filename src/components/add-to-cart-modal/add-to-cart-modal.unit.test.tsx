import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import AddToCartModal from './add-to-cart-modal';

jest.mock('./add-to-cart-modal-card/add-to-cart-modal-card', () => () => <div data-testid='add-to-cart-modal-card'></div>);
jest.mock('./add-to-cart-modal-success/add-to-cart-modal-success', () => () => <div data-testid='add-to-cart-modal-success'></div>);

describe('AddToCartModal component', () => {
  test('renders AddToCartModalCard after init', () => {
    renderWithReduxAndRouter(<AddToCartModal/>);

    expect(screen.getByTestId('add-to-cart-modal-card')).toBeInTheDocument();
    expect(screen.queryByTestId('add-to-cart-modal-success')).not.toBeInTheDocument();
  });
});
