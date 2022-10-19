import { fireEvent, getByText, screen } from '@testing-library/react';
import { AppUrl } from '../../consts';
import { renderTestApp } from '../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Breadcrumbs from './breadcrumbs';

describe('Breacrumbs', () => {
  test('Render Breacrumbs', () => {
    const breadcrumbs = renderWithReduxAndRouter(<Breadcrumbs/>);
    expect(breadcrumbs).toMatchSnapshot();
  });

  test('Links render right', () => {
    renderWithReduxAndRouter(<Breadcrumbs/>, { route: `${AppUrl.Catalog}` });
    const catalogLink = screen.getByText(/Каталог/i);
    expect(catalogLink).toBeInTheDocument();

    const mainLinkActive = screen.getByText(/Главная/i);
    expect(mainLinkActive).toBeInTheDocument(); 
  });

  test('Active and inactive links work right', async() => {
    renderTestApp(null, { route: `${AppUrl.Catalog}` });
    const breadcrumbs = screen.getByTestId('breadcrumbs');
    const catalogLinkInactive = getByText(breadcrumbs, /Каталог/i);
    fireEvent.click(catalogLinkInactive);
    const catalogPage = screen.getByTestId('catalog-page');
    expect(catalogPage).toBeInTheDocument();

    renderTestApp(null, { route: `${AppUrl.Catalog}${AppUrl.Product}/1` });
    const catalogLink = getByText(breadcrumbs,/Каталог/i);
    fireEvent.click(catalogLink);
    expect(catalogPage).toBeInTheDocument();
  });
});
