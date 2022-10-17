import { fireEvent, getByText, screen } from '@testing-library/react';
import { AppUrl } from '../../consts';
import { renderTestApp } from '../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Footer from './footer';

describe('Footer', () => {
  test('Render correctly', () => {
    const footer = renderWithReduxAndRouter(<Footer/>);
    expect(footer).toMatchSnapshot();
  });

  test('Link to pages correctly', () => {
    renderTestApp(null, { route: `${AppUrl.Catalog}${AppUrl.Product}/1` });
    const footer = screen.getByTestId('footer');
    const catalogLink = getByText<HTMLLinkElement>(footer, /Каталог/i);
    fireEvent.click(catalogLink);
    expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
  });
});
