import { fireEvent, screen } from '@testing-library/react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { ActionCreator } from '../../../store/action';
import { postPromocode } from '../../../store/api-action';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import Promocode from './promocode';

jest.mock('../../../hooks/use-app-dispatch');
jest.mock('../../../store/api-action', () => ({
  postPromocode: jest.fn()
}));

const dispatchSpy = jest.fn();

describe('Promocode component', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(dispatchSpy);
  });

  test('displays inputed value correctly', () => {
    renderWithReduxAndRouter(<Promocode/>);

    const input = screen.getByPlaceholderText('Введите промокод');
    fireEvent.change(input, { target: { value: 'abc' }});

    expect(input).toHaveValue('abc');
  });

  test('should make correct dispatch and display error if value is invalid after confirm-button click', () => {
    renderWithReduxAndRouter(<Promocode/>);

    const input = screen.getByPlaceholderText('Введите промокод');
    fireEvent.change(input, { target: { value: 'abc d' }});
    fireEvent.click(screen.getByText('Применить'));

    expect(dispatchSpy).toHaveBeenCalledTimes(3);
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, ActionCreator.SetPromocode(null));
    expect(dispatchSpy).toHaveBeenNthCalledWith(2, ActionCreator.ChangePromocodeConfirmed(null));
    expect(dispatchSpy).toHaveBeenNthCalledWith(3, ActionCreator.SetDiscount(0));
    expect(screen.getByTestId('promocode-container')).toHaveClass(' is-invalid');
    expect(screen.getByText(/Неверный формат/i)).toBeInTheDocument();
  });

  test('should remove error on input change after it was invalid', () => {
    renderWithReduxAndRouter(<Promocode/>);

    const input = screen.getByPlaceholderText('Введите промокод');
    fireEvent.change(input, { target: { value: 'abc d' }});
    fireEvent.click(screen.getByText('Применить'));

    expect(screen.getByTestId('promocode-container')).toHaveClass(' is-invalid');
    expect(screen.getByText(/Неверный формат/i)).toBeInTheDocument();
    
    fireEvent.change(input, { target: { value: 'a' }});

    expect(screen.getByTestId('promocode-container')).not.toHaveClass(' is-invalid');
    expect(screen.queryByText(/Неверный формат/i)).not.toBeInTheDocument();
  });

  test('should make correct dispatch if value is empty after confirm-button click', () => {
    renderWithReduxAndRouter(<Promocode/>);

    const input = screen.getByPlaceholderText('Введите промокод');
    fireEvent.change(input, { target: { value: '' }});
    fireEvent.click(screen.getByText('Применить'));

    expect(dispatchSpy).toHaveBeenCalledTimes(3);
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, ActionCreator.SetPromocode(null));
    expect(dispatchSpy).toHaveBeenNthCalledWith(2, ActionCreator.ChangePromocodeConfirmed(null));
    expect(dispatchSpy).toHaveBeenNthCalledWith(3, ActionCreator.SetDiscount(0));
  });

  test('should make correct dispatch if value is valid after confirm-button click', () => {
    renderWithReduxAndRouter(<Promocode/>);

    const input = screen.getByPlaceholderText('Введите промокод');
    fireEvent.change(input, { target: { value: 'abc' }});
    fireEvent.click(screen.getByText('Применить'));

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(postPromocode).toHaveBeenCalledWith('abc');
  });

  test('should display success message if promocode was confirmed', () => {
    renderWithReduxAndRouter(<Promocode/>, { initialState: { cart: { isPromocodeConfirmed: true}}});

    expect(screen.getByTestId('promocode-container')).toHaveClass(' is-valid');
    expect(screen.getByText(/Промокод принят/i)).toBeInTheDocument();
  });

  test('should display error message if promocode was not confirmed', () => {
    renderWithReduxAndRouter(<Promocode/>, { initialState: { cart: { isPromocodeConfirmed: false}}});

    expect(screen.getByTestId('promocode-container')).toHaveClass(' is-invalid');
    expect(screen.getByText(/Промокод неверный/i)).toBeInTheDocument();
  });
});
