import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import AddingToCartModal from './adding-to-cart-modal';

jest.mock('./adding-to-cart-modal-card/adding-to-cart-modal-card', () => () => <div data-testid='adding-to-cart-modal-card'></div>);
jest.mock('./adding-to-cart-modal-success/adding-to-cart-modal-success', () => () => <div data-testid='adding-to-cart-modal-success'></div>);

describe('AddingToCartModal component', () => {
  test('renders AddingToCartModalCard after init', () => {
    renderWithReduxAndRouter(<AddingToCartModal/>);

    expect(screen.getByTestId('adding-to-cart-modal-card')).toBeInTheDocument();
    expect(screen.queryByTestId('adding-to-cart-modal-success')).not.toBeInTheDocument();
  });
});
