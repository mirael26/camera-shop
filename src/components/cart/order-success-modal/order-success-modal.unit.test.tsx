import { fireEvent, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { AppUrl } from '../../../consts';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { ActionCreator } from '../../../store/action';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import OrderSuccessModal from './order-success-modal';

jest.mock('../../../hooks/use-app-dispatch');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const dispatchSpy = jest.fn();
const navigateSpy = jest.fn();

describe('OrderSuccessModal component', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(dispatchSpy);
    jest.mocked(useNavigate).mockReturnValue(navigateSpy);
  });

  test('should close modal and redirect to catalog on return-to-shopping-button click', () => {
    renderWithReduxAndRouter(<OrderSuccessModal/>);

    fireEvent.click(screen.getByText(/Вернуться к покупкам/i));

    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.CloseModal());
    expect(navigateSpy).toHaveBeenCalledWith(AppUrl.Catalog);
  });

  test('should close modal on close button click', () => {
    renderWithReduxAndRouter(<OrderSuccessModal/>);

    fireEvent.click(screen.getByLabelText(/Закрыть попап/i));

    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.CloseModal());
  });
});
