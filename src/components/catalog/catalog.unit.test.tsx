import { screen } from '@testing-library/react';
import { productsMock } from '../../test/mocks';
import axios from 'axios';
import Catalog from './catalog';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';

jest.mock('./filters/filters', () => 'Filters');
jest.mock('./pagination/pagination', () => 'Pagination');
jest.mock('./sorts/sorts', () => 'Sorts');
jest.mock('../product-card/product-card', () => () => (<div data-testid='product-card'></div>));
jest.mock('axios');

describe('Catalog', () => {
  beforeEach(() => {
    jest.mocked(axios).get.mockResolvedValue({});
  });

  test('Render correct products count', () => {
    renderWithReduxAndRouter(<Catalog/>, {initialState: { data: { displayedProducts: productsMock}}});

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(3);
    expect(axios.get).toBeCalledTimes(3);
  });

  test('Don\'t render if no products', () => {
    renderWithReduxAndRouter(<Catalog/>, {initialState: { data: { displayedProducts: []}}});
  
    const cards = screen.queryAllByTestId('product-card');
    expect(cards).toHaveLength(0);
  });
});
