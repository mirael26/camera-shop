import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import ProductPage from './product-page';

jest.mock('../../components/breadcrumbs/breadcrumbs', () => 'Breadcrumbs');
jest.mock('../../components/footer/footer', () => 'Footer');
jest.mock('../../components/header/header', () => 'Header');
jest.mock('../../components/modal/modal', () => 'Modal');
jest.mock('../../components/reviews/reviews', () => 'Reviews');
jest.mock('../../components/similar-products/similar-products', () => 'SimilarProducts');
jest.mock('../../components/up-button/up-button', () => 'UpButton');
jest.mock('../../components/product/product', () => 'Product');

test('ProductPage render correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<ProductPage/>);
  expect(asFragment()).toMatchSnapshot();
});
