import { fireEvent, getByText, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppUrl } from '../../consts';
import { renderTestApp } from '../../test/helpers/renderTestApp';
import { renderWithRedux } from '../../test/helpers/renderWithRedux';
import Breadcrumbs from './breadcrumbs';

describe('Breacrumbs', () => {
  test('Render Breacrumbs', () => {
    const breadcrumbs = renderWithRedux(
      <MemoryRouter>
        <Breadcrumbs />
      </MemoryRouter>
    );
    expect(breadcrumbs).toMatchSnapshot();
  });

  test('Links render right', () => {
    renderWithRedux(
      <MemoryRouter initialEntries={[`${AppUrl.Catalog}`]}>
        <Breadcrumbs />
      </MemoryRouter>
    );
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
