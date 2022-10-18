import { fireEvent, getByText, screen } from '@testing-library/react';
import { AppUrl } from '../../consts';
import { renderTestApp } from '../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../test/mocks';
import ProductCard from './product-card';

describe('ProductCard', () => {
  test('Render correctly', () => {
    const product = renderWithReduxAndRouter(<ProductCard product={productMock}/>);
    expect(product).toMatchSnapshot();
  });

  test('Display product data correctly', () => {
    renderWithReduxAndRouter(<ProductCard product={productMock}/>);
    expect(screen.getByTestId('rating')).toHaveTextContent('3');
    expect(screen.getByTestId('rate-count')).toHaveTextContent('17');
    expect(screen.getByTestId('name')).toHaveTextContent(/Орлёнок/i);
    expect(screen.getByTestId('price')).toHaveTextContent(/19 970/i);
  });

  test('Click on buy-button opens popup', () => {
    renderTestApp(<ProductCard product={productMock}/>, { route: AppUrl.Catalog });
    const productCard = screen.getByTestId('product-card');
    const buyButton = getByText(productCard, /Купить/i);
    fireEvent.click(buyButton);
    expect(screen.getByTestId('add-to-cart-modal')).toBeInTheDocument();
  });

  test('Click on details-link redirect to product page', () => {
    renderTestApp(<ProductCard product={productMock}/>, { route: AppUrl.Catalog });
    const productCard = screen.getByTestId('product-card');
    const detailsLink = getByText(productCard, /Подробнее/i);
    fireEvent.click(detailsLink);
    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });
});
