import { screen } from '@testing-library/react';
import { AppUrl } from '../../consts';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Breadcrumbs from './breadcrumbs';

describe('Breacrumbs', () => {
  test('Renders links correctly', () => {
    renderWithReduxAndRouter(<Breadcrumbs/>, { route: `${AppUrl.Catalog}` });
    const catalogLink = screen.getByText(/Каталог/i);
    expect(catalogLink).toBeInTheDocument();

    const mainLinkActive = screen.getByText(/Главная/i);
    expect(mainLinkActive).toBeInTheDocument();
  });

  test('Renders active link correctly', () => {
    renderWithReduxAndRouter(<Breadcrumbs/>, { route: `${AppUrl.Catalog}` });

    expect(screen.getByText<HTMLSpanElement>(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText<HTMLSpanElement>(/Каталог/i)).toHaveClass('breadcrumbs__link--active');
  });

  test('Renders inactive link correctly', () => {
    renderWithReduxAndRouter(<Breadcrumbs/>, { route: `${AppUrl.Catalog}${AppUrl.Product}/1` });

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).not.toHaveClass('breadcrumbs__link--active');
    expect(screen.getByText(/Каталог/i)).toHaveAttribute('href', AppUrl.Catalog);
  });
});
