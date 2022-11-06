import { screen } from '@testing-library/react';
import { bigProductsMock, productsMock } from '../../test/mocks';
import axios from 'axios';
import Catalog from './catalog';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { AppUrl } from '../../consts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loadDisplayedProducts, loadFilteredProducts } from '../../store/api-action';

const spyNavigate = jest.fn();

jest.mock('../filters/filters', () => 'Filters');
jest.mock('./sorts/sorts', () => 'Sorts');
jest.mock('./product-list/product-list', () => () => <div data-testid='product-list'></div>);
jest.mock('./pagination/pagination', () => () => <div data-testid='pagination'></div>);
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('../../hooks/use-app-dispatch');
jest.mock('../../store/api-action', () => ({
  loadFilteredProducts: jest.fn(),
  loadDisplayedProducts: jest.fn(),
}));

describe('Catalog', () => {
  beforeEach(() => {
    jest.mocked(axios).get.mockResolvedValue({});
    jest.mocked(useNavigate).mockReturnValue(spyNavigate);
    jest.mocked(useAppDispatch).mockReturnValue(jest.fn());
  });
 
  test('does not render content if no products', () => {
    renderWithReduxAndRouter(<Catalog/>, {initialState: { data: { products: null}}});
    const content = screen.queryByTestId('catalog-content');
    expect(content).not.toBeInTheDocument();
  });

  test('renders product-list if allProducts and displayedProducts have been loaded', () => {
    renderWithReduxAndRouter(<Catalog/>, {initialState: {
      data: { products: productsMock, displayedProducts: productsMock},
      view: { productsIsLoading: false },
    }});

    const productList = screen.getByTestId('product-list');
    expect(productList).toBeInTheDocument();
  });

  test('renders loader instead of product-list if displayedProducts is loading', () => {
    renderWithReduxAndRouter(<Catalog/>, {initialState: {
      data: { products: productsMock, displayedProducts: false},
      view: { productsIsLoading: true },
    }});

    expect(screen.getByTestId('catalog-loader')).toBeInTheDocument();
    expect(screen.queryByTestId('product-list')).not.toBeInTheDocument();
  });

  test('renders nothing-found message if no products in displayedProducts', () => {
    renderWithReduxAndRouter(<Catalog/>, {initialState: {
      data: { products: productsMock, displayedProducts: []},
      view: { productsIsLoading: false },
    }});

    expect(screen.getByText(/Ничего не найдено/i)).toBeInTheDocument();
  });

  test('renders paginations if products count more than products count on page', () => {
    renderWithReduxAndRouter(<Catalog/>, {initialState: {
      data: { products: productsMock, displayedProducts: productsMock, filteredProducts: bigProductsMock.concat(bigProductsMock, bigProductsMock)},
      view: { productsIsLoading: false },
    }});

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('does not render paginations if products count less than products count on page', () => {
    renderWithReduxAndRouter(<Catalog/>, {initialState: {
      data: { products: productsMock, displayedProducts: productsMock, filteredProducts: productsMock},
      view: { productsIsLoading: false },
    }});

    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  test('add param default page if no page', () => {
    renderWithReduxAndRouter(<Catalog/>, { route: `${AppUrl.Catalog}` });

    expect(spyNavigate).toHaveBeenCalledTimes(1);
    expect(spyNavigate).toHaveBeenCalledWith(`${AppUrl.Catalog}?page=1`, {replace: true});
  });

  test('send loadFilteredProducts query if some filter-prop exists', () => {
    renderWithReduxAndRouter(<Catalog/>, { route: `${AppUrl.Catalog}?page=1&category=camera` });

    expect(loadFilteredProducts).toHaveBeenCalledTimes(1);
    expect(loadFilteredProducts).toHaveBeenCalledWith(new URLSearchParams('?category=camera'));
  });

  test('does not send loadFilteredProducts query if no filter-props', () => {
    renderWithReduxAndRouter(<Catalog/>, { route: `${AppUrl.Catalog}?page=1` });

    expect(loadFilteredProducts).not.toHaveBeenCalled();
  });

  test('send loadDisplayedProducts query with right props', () => {
    renderWithReduxAndRouter(<Catalog/>, { route: `${AppUrl.Catalog}?page=1&category=camera&sort=price` });

    expect(loadDisplayedProducts).toHaveBeenCalledTimes(1);
    expect(loadDisplayedProducts).toHaveBeenCalledWith(new URLSearchParams('?category=camera&_start=0&_end=9&_sort=price'));
  });
});
