import { fireEvent, screen } from '@testing-library/react';
import { useModalClose } from '../../../../hooks/use-modal-close';
import { renderWithReduxAndRouter } from '../../../../test/helpers/render-with-redux-and-router';
import ReviewModalContent from './review-modal-content';

const onModalCloseSpy = jest.fn();

jest.mock('../../../../hooks/use-modal-close');

jest.mock('../review-form/review-form', () => () => (<div data-testid='review-form'></div>));
jest.mock('../review-success/review-success', () => () => (<div data-testid='review-success'></div>));

describe('ReviewModalContent', () => {
  beforeEach(() => {
    jest.mocked(useModalClose).mockReturnValue({onModalClose: onModalCloseSpy});
  });

  test('Render form on init', () => {
    renderWithReduxAndRouter(<ReviewModalContent/>);

    expect(screen.getByTestId('review-form')).toBeInTheDocument();
    expect(screen.queryByTestId('review-success')).not.toBeInTheDocument();
  })

  test('Close correctly by click on overlay', () => {
    renderWithReduxAndRouter(<ReviewModalContent/>);

    const modalOverlay = screen.getByTestId('modal-overlay');
    fireEvent.click(modalOverlay);

    expect(onModalCloseSpy).toHaveBeenCalledTimes(1);
  });

  test('Do not close by click on not-overlay', () => {
    renderWithReduxAndRouter(<ReviewModalContent/>);

    const modalContent = screen.getByTestId('review-form');
    fireEvent.click(modalContent);

    expect(onModalCloseSpy).toHaveBeenCalledTimes(0);
  });
});
