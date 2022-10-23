import { screen } from '@testing-library/react';
import { AppUrl, Tab } from '../../../consts';
import { renderTestApp } from '../../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import AppRouter from './app-router';

jest.mock('../../../pages/catalog-page/catalog-page', () => () => (<div data-testid='catalog-page'></div>));
jest.mock('../../../pages/product-page/product-page', () => () => (<div data-testid='product-page'></div>));
jest.mock('../../../pages/not-found-page/not-found-page', () => () => (<div data-testid='not-found-page'></div>));

describe('Test AppRouter routers', () => {
  test('Routes to catalog page', () => {
    renderWithReduxAndRouter(<AppRouter/>, { route: AppUrl.Catalog });
    const catalogPage = screen.getByTestId('catalog-page');
    expect(catalogPage).toBeInTheDocument();

    renderTestApp(null, { route: `${AppUrl.Catalog}${AppUrl.Page}3` });
    expect(catalogPage).toBeInTheDocument();
  });

  test('Routes to product page', () => {
    renderWithReduxAndRouter(<AppRouter/>, { route: `${AppUrl.Catalog}${AppUrl.Product}/1` });
    const productPage = screen.getByTestId('product-page');
    expect(productPage).toBeInTheDocument();

    renderWithReduxAndRouter(<AppRouter/>, { route: `${AppUrl.Catalog}${AppUrl.Product}/1/${Tab.Features}` });
    expect(productPage).toBeInTheDocument();
  });

  test('Routes to not-found page', () => {
    renderWithReduxAndRouter(<AppRouter/>, { route: AppUrl.NotFound });
    const notFoundPage = screen.getByTestId('not-found-page');
    expect(notFoundPage).toBeInTheDocument();

    renderWithReduxAndRouter(<AppRouter/>, { route: '/sdf57sdfsdf58' });
    expect(notFoundPage).toBeInTheDocument();
  });
});
