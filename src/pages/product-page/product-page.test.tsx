import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import ProductPage from './product-page';

test('ProductPage render correctly', () => {
  const productPage = renderWithReduxAndRouter(<ProductPage/>);
  expect(productPage).toMatchSnapshot();
});
