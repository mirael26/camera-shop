import { fireEvent, getByText, screen } from '@testing-library/react';
import { AppUrl } from '../../../consts';
import { renderTestApp } from '../../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import MainNav from './main-nav';

describe('MainNav', () => {
  test('Render correctly', () => {
    const mainNav = renderWithReduxAndRouter(<MainNav/>);
    expect(mainNav).toMatchSnapshot();
  });

  test('Link to pages correctly', () => {
    renderTestApp(null, { route: `${AppUrl.Catalog}${AppUrl.Product}/1` });
    const mainNav = screen.getByTestId('main-nav');
    const catalogLink = getByText<HTMLLinkElement>(mainNav, /Каталог/i);
    fireEvent.click(catalogLink);
    expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
  });
});
