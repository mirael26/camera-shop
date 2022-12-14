import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../test/mocks';
import ProductCard from './product-card';

jest.mock('../rating-stars/rating-stars', () => 'RatingStars');

test('ProductCard renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<ProductCard product={productMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
