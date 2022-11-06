import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productsMock } from '../../../test/mocks';
import ProductList from './product-list';

jest.mock('../../product-card/product-card', () => 'ProductCard');

test('ProductList renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<ProductList products={productsMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
