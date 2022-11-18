import { fireEvent, screen } from '@testing-library/react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { ActionCreator } from '../../../store/action';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import ReviewModalSuccess from './review-modal-success';

jest.mock('../../../hooks/use-app-dispatch');

const dispatchSpy = jest.fn();

describe('ReviewModalSuccess component', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(dispatchSpy);
  });

  test('should be closed on button-close click', () => {
    renderWithReduxAndRouter(<ReviewModalSuccess/>);
    const closeButton = screen.getByLabelText('Закрыть попап');
  
    fireEvent.click(closeButton);
  
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.CloseModal());
  });

  test('Return button work correctly', () => {
    renderWithReduxAndRouter(<ReviewModalSuccess/>);
    const returnButton = screen.getByText(/Вернуться к покупкам/i);
  
    fireEvent.click(returnButton);
  
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.CloseModal());
  });
});
