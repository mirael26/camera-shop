import { screen } from '@testing-library/react';
import { AppUrl } from '../../consts';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Footer from './footer';

test('Footer render links correctly', () => {
  renderWithReduxAndRouter(<Footer/>, { route: `${AppUrl.Catalog}${AppUrl.Product}/1` });
  expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  expect(screen.getByText(/Каталог/i)).toHaveAttribute('href', AppUrl.Catalog);
});
