import { fireEvent, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Filters from './filters';

jest.mock('./category-filter/category-filter', () => 'CategoryFilter');
jest.mock('./level-filter/level-filter', () => 'LevelFilter');
jest.mock('./price-filter/price-filter', () => 'PriceFilter');
jest.mock('./type-filter/type-filter', () => 'TypeFilter');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));
jest.mock('../../hooks/use-app-dispatch');
jest.mock('../../hooks/use-app-dispatch');

const setParamsSpy = jest.fn();
const dispatchSpy = jest.fn();

test('Filter component resets params correctly and uploads products on reset-button click', () => {
  const params = new URLSearchParams('?price_min=900&price_max=2000&category=Фотоаппарат&level=Нулевой&type=Моментальная&page=4');
  jest.mocked(useSearchParams).mockReturnValue([params, setParamsSpy]);
  jest.mocked(useAppDispatch).mockReturnValue(dispatchSpy);
  renderWithReduxAndRouter(<Filters/>);

  fireEvent.click(screen.getByText(/Сбросить фильтры/i));
  expect(setParamsSpy).toHaveBeenCalledWith(new URLSearchParams('?page=1'));
  expect(dispatchSpy).toHaveBeenCalledTimes(1);
  expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.LoadFilteredProducts(null));
});
