import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../test/mocks';
import Product from './product';

jest.mock('../rating-stars/rating-stars', () => 'RatingStars');

test('Product renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Product/>, { initialState: { 
    data: { currentProduct: productMock }
  }});
  expect(asFragment()).toMatchSnapshot();
});
