import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productsMock } from '../../test/mocks';
import SimilarProducts from './similar-products';

jest.mock('../product-card/product-card', () => 'ProductCard');

test('SimilarProducts renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<SimilarProducts/>, {
    initialState: {
      data: { similarProducts: productsMock }
    }
  });
  expect(asFragment()).toMatchSnapshot();
});
