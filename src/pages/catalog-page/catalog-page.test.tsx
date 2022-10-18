import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import CatalogPage from './catalog-page';

test('CatalogPage render correctly', () => {
  const catalogPage = renderWithReduxAndRouter(<CatalogPage/>);
  expect(catalogPage).toMatchSnapshot();
});
