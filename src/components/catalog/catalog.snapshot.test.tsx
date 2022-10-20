import axios from 'axios';
import Catalog from './catalog';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productsMock } from '../../test/mocks';

jest.mock('./filters/filters', () => 'Filters');
jest.mock('./pagination/pagination', () => 'Pagination');
jest.mock('./sorts/sorts', () => 'Sorts');
jest.mock('../product-card/product-card', () => 'ProductCard');
jest.mock('axios');

test('Catalog renders correctly', () => {
  jest.mocked(axios).get.mockResolvedValue({ data: productsMock });
  const { asFragment } = renderWithReduxAndRouter(<Catalog/>, {initialState: { data: { products: productsMock }}});
  expect(asFragment()).toMatchSnapshot();
});
