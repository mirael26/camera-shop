import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { Modal as ModalType } from '../../consts';
import Modal from './modal';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';

jest.mock('../add-to-cart-modal/add-to-cart-modal', () => () => <div data-testid='add-to-cart-modal'></div>);
jest.mock('../review-modal/review-modal', () => () => <div data-testid='review-modal'></div>);
jest.mock('../../hooks/use-app-dispatch');

const spyDispatch = jest.fn();

describe('Modal component', () => {
  beforeEach(() => {
    jest.mocked(useAppDispatch).mockReturnValue(spyDispatch);
  });

  test('renders only one right modal', () => {
    renderWithReduxAndRouter(<Modal/>, { initialState: {
      view: {
        isModalOpen: true,
        activeModal: ModalType.AddToCart,
      }
    }});

    expect(screen.getByTestId('add-to-cart-modal')).toBeInTheDocument();
    expect(screen.queryByTestId('review-modal')).not.toBeInTheDocument();
  });

  test('should close by click on overlay', () => {
    renderWithReduxAndRouter(<Modal/>, { initialState: {
      view: {
        isModalOpen: true,
        activeModal: ModalType.AddToCart,
      }
    }});

    const modalOverlay = screen.getByTestId('modal-overlay');
    fireEvent.click(modalOverlay);

    expect(spyDispatch).toHaveBeenCalledWith(ActionCreator.CloseModal());
  });

  test('Shouldn\'t close by click on not-overlay', () => {
    renderWithReduxAndRouter(<Modal/>, { initialState: {
      view: {
        isModalOpen: true,
        activeModal: ModalType.AddToCart,
      }
    }});
    
    const modalContent = screen.getByTestId('modal-content');
    fireEvent.click(modalContent);

    expect(spyDispatch).toBeCalledTimes(0);
  });

  test('should close by escape keydown', async () => {
    renderWithReduxAndRouter(<Modal/>, { initialState: {
      view: {
        isModalOpen: true,
        activeModal: ModalType.AddToCart,
      }
    }});
  
    await userEvent.keyboard('{Escape}');
  
    expect(spyDispatch).toHaveBeenCalledWith(ActionCreator.CloseModal());
  });

  test('shouldnt close by another key keydown', async () => {
    renderWithReduxAndRouter(<Modal/>, { initialState: {
      view: {
        isModalOpen: true,
        activeModal: ModalType.AddToCart,
      }
    }});

    await userEvent.keyboard('{Shift}');
  
    expect(spyDispatch).toHaveBeenCalledTimes(0);
  });

  test('should close by back-button in browser', () => {
    renderWithReduxAndRouter(<Modal/>, { initialState: {
      view: {
        isModalOpen: true,
        activeModal: ModalType.AddToCart,
      }
    }});
  
    fireEvent.popState(window);
  
    expect(spyDispatch).toHaveBeenCalledWith(ActionCreator.CloseModal());
  });


  test('adds event listeners and attributes correctly', () => {
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(window, 'addEventListener');

    renderWithReduxAndRouter(<Modal/>, { initialState: {
      view: {
        isModalOpen: true,
        activeModal: ModalType.AddToCart,
      }
    }});
  
    expect(document.addEventListener).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledTimes(1);
    expect(document.body).toHaveStyle('overflow: hidden');
  });
});
