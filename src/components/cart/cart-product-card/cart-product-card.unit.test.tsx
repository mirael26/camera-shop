import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../../../consts';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { ActionCreator } from '../../../store/action';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productsInCartMock } from '../../../test/mocks';
import CartProductCard, { ProductsCount } from './cart-product-card';

jest.mock('../../../hooks/use-app-dispatch');

const dispatchSpy = jest.fn();

describe('CartProductCard component', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(dispatchSpy);
  });

  test('displays correct productCount and total price', () => {
    renderWithReduxAndRouter(<CartProductCard product={productsInCartMock[1]}/>);

    expect(screen.getByLabelText('количество товара')).toHaveValue(3);
    expect(screen.getByTestId('total-price').textContent).toContain('449 970');
  });

  test('disables buttons when min and max prices', async() => {
    const {unmount} = renderWithReduxAndRouter(<CartProductCard product={{...productsInCartMock[0], countInCart: ProductsCount.Min}}/>);

    let input = screen.getByLabelText('количество товара');
    expect(input).toHaveValue(ProductsCount.Min);
    expect(screen.getByLabelText('уменьшить количество товара')).toBeDisabled();
    expect(screen.getByLabelText('увеличить количество товара')).not.toBeDisabled();

    unmount();
    renderWithReduxAndRouter(<CartProductCard product={{...productsInCartMock[0], countInCart: ProductsCount.Max}}/>);

    input = screen.getByLabelText('количество товара');
    expect(input).toHaveValue(ProductsCount.Max);
    expect(screen.getByLabelText('уменьшить количество товара')).not.toBeDisabled();
    expect(screen.getByLabelText('увеличить количество товара')).toBeDisabled();
  });

  test('increases value correctly by click on increase button', () => {
    renderWithReduxAndRouter(<CartProductCard product={productsInCartMock[0]}/>);

    const input = screen.getByLabelText('количество товара');
    expect(input).toHaveValue(1);

    fireEvent.click(screen.getByLabelText('увеличить количество товара'));
    expect(input).toHaveValue(2);
  });

  test('decreases value correctly by click on decrease button', () => {
    renderWithReduxAndRouter(<CartProductCard product={productsInCartMock[1]}/>);

    const input = screen.getByLabelText('количество товара');
    expect(input).toHaveValue(3);

    fireEvent.click(screen.getByLabelText('уменьшить количество товара'));
    expect(input).toHaveValue(2);
  });

  test('sends correct dispatch after inputing correct value and after input blur', () => {
    renderWithReduxAndRouter(<CartProductCard product={productsInCartMock[1]}/>);

    const input = screen.getByLabelText('количество товара');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '30'}});
    fireEvent.blur(input);

    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.ChangeProductCountInCart(productsInCartMock[1].id, 30));
  });

  test('sends correct dispatch after inputing correct value and after enter keydown', async() => {
    renderWithReduxAndRouter(<CartProductCard product={productsInCartMock[1]}/>);

    const input = screen.getByLabelText('количество товара');

    input.focus();
    fireEvent.change(input, { target: { value: '30'}});
    await userEvent.keyboard('{enter}');

    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.ChangeProductCountInCart(productsInCartMock[1].id, 30));
  });

  test('sends correct dispatch after inputing incorrect value and after enter keydown', async() => {
    renderWithReduxAndRouter(<CartProductCard product={productsInCartMock[1]}/>);

    const input = screen.getByLabelText('количество товара');

    input.focus();
    fireEvent.change(input, { target: { value: '100'}});
    await userEvent.keyboard('{enter}');

    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.ChangeProductCountInCart(productsInCartMock[1].id, 99));
  });

  test('sends correct dispatch on delete button click', async() => {
    renderWithReduxAndRouter(<CartProductCard product={productsInCartMock[1]}/>);

    fireEvent.click(screen.getByLabelText(/Удалить товар/i));

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, ActionCreator.SetDeletedFromCartItem(productsInCartMock[1]));
    expect(dispatchSpy).toHaveBeenNthCalledWith(2, ActionCreator.OpenModal(Modal.DeletingFromCart));
  });
});
