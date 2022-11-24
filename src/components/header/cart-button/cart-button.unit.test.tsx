import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productsInCartMock } from '../../../test/mocks';
import CartButton from './cart-button';

describe('CartButton component', () => {
  test('does not redner counter if cart is empty', () => {
    renderWithReduxAndRouter(<CartButton/>, { initialState: { cart: { productsInCart: [] }}});

    expect(screen.queryByTestId('header-cart-counter')).not.toBeInTheDocument();
  });

  test('redners correct counter if cart is not empty', () => {
    renderWithReduxAndRouter(<CartButton/>, { initialState: { cart: { productsInCart: productsInCartMock }}});

    expect(screen.getByTestId('header-cart-counter')).toBeInTheDocument();
    expect(screen.getByTestId('header-cart-counter')).toHaveTextContent('4');
  });
});
