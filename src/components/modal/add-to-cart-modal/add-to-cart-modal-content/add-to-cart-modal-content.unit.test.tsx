import { fireEvent, screen } from '@testing-library/react';
import { useModalClose } from '../../../../hooks/use-modal-close';
import { renderWithReduxAndRouter } from '../../../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../../../test/mocks';
import AddToCartModalContent from './add-to-cart-modal-content';

const onModalCloseSpy = jest.fn();

jest.mock('../../../../hooks/use-modal-close');

describe('AddToCartModalContent', () => {
  beforeEach(() => {
    jest.mocked(useModalClose).mockReturnValue({onModalClose: onModalCloseSpy});
  });

  test('Should close by click on close-button', () => {
    renderWithReduxAndRouter(<AddToCartModalContent product={productMock}/>);

    fireEvent.click(screen.getByLabelText('Закрыть попап'));

    expect(onModalCloseSpy).toBeCalledTimes(1);
  });

  test('Should close by click on overlay', () => {
    renderWithReduxAndRouter(<AddToCartModalContent product={productMock}/>);

    const modalOverlay = screen.getByTestId('modal-overlay');
    fireEvent.click(modalOverlay);

    expect(onModalCloseSpy).toBeCalledTimes(1);
  });

  test('Shouldn\'t close by click on not-overlay', () => {
    renderWithReduxAndRouter(<AddToCartModalContent product={productMock}/>);
    
    const modalContent = screen.getByTestId('modal-content');
    fireEvent.click(modalContent);

    expect(onModalCloseSpy).toBeCalledTimes(0);
  });
});
