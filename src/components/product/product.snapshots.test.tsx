import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../test/mocks';
import Product from './product';

test('Product renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Product/>, { initialState: { 
    data: { currentProduct: productMock }
  }});
  expect(asFragment()).toMatchSnapshot();
});
