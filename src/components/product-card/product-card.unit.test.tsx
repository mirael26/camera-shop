import { fireEvent, screen } from '@testing-library/react';
import { AppUrl, Modal } from '../../consts';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../test/mocks';
import ProductCard from './product-card';

const spyDispatch =  jest.fn();
jest.mock('../../hooks/use-app-dispatch');

jest.mock('../rating-stars/rating-stars', () => 'RatingStars');

describe('ProductCard', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(spyDispatch);
  });

  test('Displays product data correctly', () => {
    renderWithReduxAndRouter(<ProductCard product={productMock}/>);

    expect(screen.getByTestId('rating')).toHaveTextContent('3');
    expect(screen.getByTestId('rate-count')).toHaveTextContent('17');
    expect(screen.getByTestId('name')).toHaveTextContent(/Орлёнок/i);
    expect(screen.getByTestId('price')).toHaveTextContent(/19 970/i);
  });

  test('Opens popup on buy-button click', () => {
    renderWithReduxAndRouter(<ProductCard product={productMock}/>);

    const buyButton = screen.getByText(/Купить/i);
    fireEvent.click(buyButton);

    expect(spyDispatch).toHaveBeenCalledTimes(2);
    expect(spyDispatch).toHaveBeenNthCalledWith(1, ActionCreator.OpenModal(Modal.AddToCart));
    expect(spyDispatch).toHaveBeenNthCalledWith(2, ActionCreator.SetAddedToCartItem(productMock));
  });

  test('renders in-cart button if product is already in cart', () => {
    renderWithReduxAndRouter(<ProductCard product={productMock}/>, {initialState: { cart: { productsInCart: [productMock]}}});

    expect(screen.getByText(/В корзине/i)).toBeInTheDocument();
    expect(screen.getByText(/В корзине/i)).toHaveAttribute('href', `${AppUrl.Catalog}${AppUrl.Cart}`);
  });

  test('Renders details-link correctly', () => {
    renderWithReduxAndRouter(<ProductCard product={productMock}/>);
    
    const detailsLink = screen.getByText(/Подробнее/i);
    expect(detailsLink).toHaveAttribute('href', `${AppUrl.Catalog}${AppUrl.Product}/${productMock.id}`);
  });
});
