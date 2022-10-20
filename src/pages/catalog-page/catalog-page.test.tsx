import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import CatalogPage from './catalog-page';

jest.mock('../../components/header/header', () => 'Header');
jest.mock('../../components/promo/promo', () => 'Promo');
jest.mock('../../components/breadcrumbs/breadcrumbs', () => 'Breadcrumbs');
jest.mock('../../components/catalog/catalog', () => 'Catalog');
jest.mock('../../components/footer/footer', () => 'Footer');
jest.mock('../../components/modal/add-to-cart-modal/add-to-cart-modal', () => 'AddToCartModal');

test('CatalogPage renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<CatalogPage/>);
  expect(asFragment()).toMatchSnapshot();
});
