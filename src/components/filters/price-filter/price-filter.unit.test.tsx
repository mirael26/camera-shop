import { fireEvent, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { loadProducts } from '../../../store/api-action';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productsMock } from '../../../test/mocks';
import { pause } from '../../../utils';
import PriceFilter, { INPUT_DELAY_MS } from './price-filter';

jest.mock('../../../hooks/use-app-dispatch');
jest.mock('../../../store/api-action', () => ({
  loadProducts: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

const setParamsSpy = jest.fn();

describe('PriceFilter component', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(jest.fn());
    jest.mocked(useSearchParams).mockImplementation(jest.requireActual('react-router-dom').useSearchParams);
  });

  test('renders default min and max placeholder to inputs correctly', () => {
    renderWithReduxAndRouter(<PriceFilter/>, { initialState: { data: { products: productsMock}}});

    const priceInputs = screen.getAllByTestId('price-input');
    expect(priceInputs).toHaveLength(2);
    expect(priceInputs[0]).toHaveAttribute('placeholder', '9490');
    expect(priceInputs[1]).toHaveAttribute('placeholder', '149990');
  });

  test('sends query if products were not loaded yet', () => {
    renderWithReduxAndRouter(<PriceFilter/>);

    expect(loadProducts).toHaveBeenCalledTimes(1);
  });

  test('does not send query if products were loaded', () => {
    renderWithReduxAndRouter(<PriceFilter/>, { initialState: { data: { products: productsMock}}});

    expect(loadProducts).not.toHaveBeenCalled();
  });

  test('sets values from params correctly', () => {
    renderWithReduxAndRouter(<PriceFilter/>, { route: '/any?price_min=900&price_max=3000', initialState: { data: { products: productsMock}}});

    const minPriceInput = screen.getAllByTestId('price-input')[0];
    const maxPriceInput = screen.getAllByTestId('price-input')[1];

    expect(minPriceInput).toHaveDisplayValue('900');
    expect(maxPriceInput).toHaveDisplayValue('3000');
  });

  test('sets values correctly if no price params', () => {
    renderWithReduxAndRouter(<PriceFilter/>, { route: '/any?page=1', initialState: { data: { products: productsMock}}});

    const priceInputs = screen.getAllByTestId('price-input');
    expect(priceInputs[0]).toHaveDisplayValue('');
    expect(priceInputs[1]).toHaveDisplayValue('');
  });

  test('corrects min-value as max-value if min-value more then max-value', async () => {
    renderWithReduxAndRouter(<PriceFilter/>, { route: '/catalog?price_max=19970', initialState: { data: { products: productsMock}}});

    const minPriceInput = screen.getAllByTestId('price-input')[0];

    fireEvent.change(minPriceInput, { target: { value: '149990'}});
    await pause(INPUT_DELAY_MS + 100);
    expect(minPriceInput).toHaveDisplayValue('19970');
  });

  test('corrects min-value to min-price in catalog', async () => {
    renderWithReduxAndRouter(<PriceFilter/>, { initialState: { data: { products: productsMock}}});

    const minPriceInput = screen.getAllByTestId('price-input')[0];

    fireEvent.change(minPriceInput, { target: { value: '500'}});
    await pause(INPUT_DELAY_MS + 100);
    expect(minPriceInput).toHaveDisplayValue('9490');
  });

  test('corrects max-value to max-prices in catalog', async () => {
    renderWithReduxAndRouter(<PriceFilter/>, { initialState: { data: { products: productsMock}}});

    const maxPriceInput = screen.getAllByTestId('price-input')[1];

    fireEvent.change(maxPriceInput, { target: { value: '500000'}});
    await pause(INPUT_DELAY_MS + 100);
    expect(maxPriceInput).toHaveDisplayValue('149990');
  });

  test('corrects min-value to prices in catalog', async () => {
    renderWithReduxAndRouter(<PriceFilter/>, { initialState: { data: { products: productsMock}}});

    const minPriceInput = screen.getAllByTestId('price-input')[0];

    fireEvent.change(minPriceInput, { target: { value: '18000'}});
    await pause(INPUT_DELAY_MS + 100);
    expect(minPriceInput).toHaveDisplayValue('19970');
  });

  test('corrects max-value to prices in catalog', async () => {
    renderWithReduxAndRouter(<PriceFilter/>, { initialState: { data: { products: productsMock}}});

    const maxPriceInput = screen.getAllByTestId('price-input')[1];

    fireEvent.change(maxPriceInput, { target: { value: '150000'}});
    await pause(INPUT_DELAY_MS + 100);
    expect(maxPriceInput).toHaveDisplayValue('149990');
  });

  test('deletes param when input value was deleted', async () => {
    jest.mocked(useSearchParams).mockReturnValue([new URLSearchParams('?page=1&price_max=149990'), setParamsSpy]);
    renderWithReduxAndRouter(<PriceFilter/>, { initialState: { data: { products: productsMock}}});

    const maxPriceInput = screen.getAllByTestId('price-input')[1];
    expect(maxPriceInput).toHaveDisplayValue('149990');

    fireEvent.change(maxPriceInput, { target: { value: ''}});
    await pause(INPUT_DELAY_MS + 100);
    expect(maxPriceInput).toHaveDisplayValue('');
    expect(setParamsSpy).toHaveBeenCalledWith(new URLSearchParams('?page=1'));
  });

  test('triggers only one setParams call when three input-changes occur in sequence', async () => {
    jest.mocked(useSearchParams).mockReturnValue([new URLSearchParams('?page=1'), setParamsSpy]);
    renderWithReduxAndRouter(<PriceFilter/>, { initialState: { data: { products: productsMock}}});

    const maxPriceInput = screen.getAllByTestId('price-input')[1];

    fireEvent.change(maxPriceInput, { target: { value: '1'}});
    fireEvent.change(maxPriceInput, { target: { value: '2'}});
    fireEvent.change(maxPriceInput, { target: { value: '3'}});
    await pause(INPUT_DELAY_MS + 100);

    expect(setParamsSpy).toHaveBeenCalledTimes(1);
  });
});
