import { screen } from '@testing-library/react';
import { AppUrl } from '../../../consts';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import AppRouter from './app-router';

jest.mock('../../../pages/catalog-page/catalog-page', () => () => (<div data-testid='catalog-page'></div>));
jest.mock('../../../pages/product-page/product-page', () => () => (<div data-testid='product-page'></div>));
jest.mock('../../../pages/cart-page/cart-page', () => () => (<div data-testid='cart-page'></div>));
jest.mock('../../../pages/not-found-page/not-found-page', () => () => (<div data-testid='not-found-page'></div>));
jest.mock('../../../pages/server-unavailable-page/server-unavailable-page', () => () => (<div data-testid='server-unavailable-page'></div>));

describe('AppRouter component', () => {
  test('redirects from main to catalog page correctly', () => {
    renderWithReduxAndRouter(<AppRouter/>, { route: AppUrl.Main });
    const catalogPage = screen.getByTestId('catalog-page');
    expect(catalogPage).toBeInTheDocument();
  });

  test('routes to catalog page', () => {
    renderWithReduxAndRouter(<AppRouter/>, { route: AppUrl.Catalog });
    const catalogPage = screen.getByTestId('catalog-page');
    expect(catalogPage).toBeInTheDocument();
  });

  test('routes to product page', () => {
    renderWithReduxAndRouter(<AppRouter/>, { route: `${AppUrl.Catalog}${AppUrl.Product}/1` });
    const productPage = screen.getByTestId('product-page');
    expect(productPage).toBeInTheDocument();
  });

  test('routes to cart page', () => {
    renderWithReduxAndRouter(<AppRouter/>, { route: `${AppUrl.Catalog}${AppUrl.Cart}` });
    const productPage = screen.getByTestId('cart-page');
    expect(productPage).toBeInTheDocument();
  });

  test('routes to not-found page on route 404', () => {
    renderWithReduxAndRouter(<AppRouter/>, { route: AppUrl.NotFound });
    const notFoundPage = screen.getByTestId('not-found-page');
    expect(notFoundPage).toBeInTheDocument();
  });

  test('routes to not-found page on non-existen route', () => {
    renderWithReduxAndRouter(<AppRouter/>, { route: '/sdf57sdfsdf58' });
    const notFoundPage = screen.getByTestId('not-found-page');
    expect(notFoundPage).toBeInTheDocument();
  });

  test('routes to server-unavailable page', () => {
    renderWithReduxAndRouter(<AppRouter/>, { route: AppUrl.ServerUnavailable });
    const serverUnavailablePage = screen.getByTestId('server-unavailable-page');
    expect(serverUnavailablePage).toBeInTheDocument();
  });
});
