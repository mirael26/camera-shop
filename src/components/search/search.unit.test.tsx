import { fireEvent, screen } from '@testing-library/react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loadProducts } from '../../store/api-action';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productsMock } from '../../test/mocks';
import Search from './search';

jest.mock('./search-list/search-list', () => () => <div data-testid='search-list'></div>);

jest.mock('../../hooks/use-app-dispatch');
jest.mock('../../store/api-action', () => ({
  loadProducts: jest.fn()
}));

describe('Search component', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(jest.fn());
  });

  test('makes query to server if no products are loaded', () => {
    renderWithReduxAndRouter(<Search/>);

    expect(loadProducts).toHaveBeenCalledTimes(1);
  });

  test('does not make query to server if products are already loaded', () => {
    renderWithReduxAndRouter(<Search/>, { initialState: { data: { products: productsMock }}});

    expect(loadProducts).toHaveBeenCalledTimes(0);
  });

  test('displays value in input when user enters a value', () => {
    renderWithReduxAndRouter(<Search/>, { initialState: { data: { products: productsMock }}});

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abc'}});
    expect(input).toHaveValue('abc');
  });

  test('does not display searched products list if no matches in products', () => {
    renderWithReduxAndRouter(<Search/>, { initialState: { data: { products: productsMock }}});

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abcdfsfasdfsf'}});
  
    expect(screen.queryByTestId('search-list')).not.toBeInTheDocument();
  });

  test('displays searched products list if any matches in products', () => {
    renderWithReduxAndRouter(<Search/>, { initialState: { data: { products: productsMock }}});

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'van'}});
  
    expect(screen.queryByTestId('search-list')).toBeInTheDocument();
  });

  test('hides searched products list if clean inputs value', () => {
    renderWithReduxAndRouter(<Search/>, { initialState: { data: { products: productsMock }}});

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'van'}});
    expect(screen.queryByTestId('search-list')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: ''}});
    expect(screen.queryByTestId('search-list')).not.toBeInTheDocument();
  });

  test('hides searched products list if click outer of search', async () => {
    renderWithReduxAndRouter(<Search/>, { initialState: { data: { products: productsMock }}});

    const search = screen.getByTestId('form-search');
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'van'}});
    expect(screen.queryByTestId('search-list')).toBeInTheDocument();
    expect(search).toHaveClass('list-opened');

    fireEvent.click(document);
    expect(search).not.toHaveClass('list-opened');
  });

  test('show searched list again if click on input if some products were found before', async () => {
    renderWithReduxAndRouter(<Search/>, { initialState: { data: { products: productsMock }}});

    const search = screen.getByTestId('form-search');
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'van'}});
    expect(screen.queryByTestId('search-list')).toBeInTheDocument();
    expect(search).toHaveClass('list-opened');

    fireEvent.click(document);
    expect(search).not.toHaveClass('list-opened');

    fireEvent.focusIn(screen.getByRole('textbox'));
    expect(search).toHaveClass('list-opened');
  });

  test('closes searched list and clear input when reset button is clicked', async () => {
    renderWithReduxAndRouter(<Search/>, { initialState: { data: { products: productsMock }}});

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'van'}});
    expect(screen.queryByTestId('search-list')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/сбросить поиск/i));

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.queryByTestId('search-list')).not.toBeInTheDocument();

  });
});
