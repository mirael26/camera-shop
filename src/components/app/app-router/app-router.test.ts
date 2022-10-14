import { screen } from '@testing-library/react';
import { AppUrl, Tab } from '../../../consts';
import { renderTestApp } from '../../../test/helpers/renderTestApp';

describe('Test AppRouter routers', () => {
  test('Route to catalog page', () => {
    renderTestApp(null, { route: AppUrl.Catalog });
    const catalogPage = screen.getByTestId('catalog-page');
    expect(catalogPage).toBeInTheDocument();
  
    renderTestApp(null, { route: `${AppUrl.Catalog}${AppUrl.Page}3` });
    expect(catalogPage).toBeInTheDocument();
  });

  test('Route to product page', () => {
    renderTestApp(null, { route: `${AppUrl.Catalog}${AppUrl.Product}/1` });
    const productPage = screen.getByTestId('product-page');
    expect(productPage).toBeInTheDocument();

    renderTestApp(null, { route: `${AppUrl.Catalog}${AppUrl.Product}/1/${Tab.Features}` });
    expect(productPage).toBeInTheDocument();
  });

  test('Route to not-found page', () => {
    renderTestApp(null, { route: AppUrl.NotFound });
    const notFoundPage = screen.getByTestId('not-found-page');
    expect(notFoundPage).toBeInTheDocument();

    renderTestApp(null, { route: `/sdf57sdfsdf58` });
    expect(notFoundPage).toBeInTheDocument();
  });
});
