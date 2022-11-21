import { fireEvent, screen } from '@testing-library/react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../test/mocks';
import AddToCartModal from './add-to-cart-modal';

jest.mock('../../hooks/use-app-dispatch');

const spyDispatch = jest.fn();

describe('AddToCartModal component', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(spyDispatch);

  });

  test('should close by click on close-button', () => {
    renderWithReduxAndRouter(<AddToCartModal/>, { initialState: {
      cart: {
        addedToCartItem: productMock,
      }
    }});

    fireEvent.click(screen.getByLabelText('Закрыть попап'));

    expect(spyDispatch).toHaveBeenCalledWith(ActionCreator.CloseModal());
  });
});
