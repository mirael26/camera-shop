import { MouseEvent, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';
import { getActiveModal, getModalStatus } from '../../store/selectors';
import { Modal as ModalType } from '../../consts';
import AddToCartModal from '../add-to-cart-modal/add-to-cart-modal';
import ReviewModal from '../review-modal/review-modal';

const Modal = (): JSX.Element | null => {
  const isOpen = useSelector(getModalStatus);
  const activeModal = useSelector(getActiveModal);
  const dispatch = useAppDispatch();

  const handleEscClick = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(ActionCreator.CloseModal());
    }
  }, [dispatch]);

  const handleBackButtonClick = useCallback((evt: PopStateEvent) => {
    evt.preventDefault();
    dispatch(ActionCreator.CloseModal());
  }, [dispatch]);

  const onModalOpen = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.querySelector('header')?.setAttribute('inert', 'inert');
    document.querySelector('main')?.setAttribute('inert', 'inert');
    document.querySelector('footer')?.setAttribute('inert', 'inert');
    document.addEventListener('keydown', handleEscClick);
    window.addEventListener('popstate', handleBackButtonClick);
  }, [handleEscClick, handleBackButtonClick]);

  const onModalClose = useCallback(() => {
    document.body.style.overflow = 'visible';
    document.querySelector('header')?.removeAttribute('inert');
    document.querySelector('main')?.removeAttribute('inert');
    document.querySelector('footer')?.removeAttribute('inert');
    document.removeEventListener('keydown', handleEscClick);
    window.removeEventListener('popstate', handleBackButtonClick);
  }, [handleEscClick, handleBackButtonClick]);

  const handleOverlayClick = (evt: MouseEvent<HTMLDivElement>) => {
    const element = evt.currentTarget;
    const isOverlay = element.classList.contains('modal__overlay');
    const isModal = element.classList.contains('modal__content');
    if (isOverlay && !isModal) {
      dispatch(ActionCreator.CloseModal());
    }
  };

  useEffect(() => {
    if (isOpen) {
      onModalOpen();
    } else {
      onModalClose();
    }
  }, [isOpen, onModalOpen, onModalClose]);

  return (
    isOpen
      ?
      <div className={`modal${isOpen ? ' is-active' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-testid='modal-overlay' onClick={handleOverlayClick}></div>

          <div className="modal__content" data-testid='modal-content'>
            {activeModal === ModalType.AddToCart && <AddToCartModal/>}
            {activeModal === ModalType.Review && <ReviewModal/>}
          </div>
        </div>
      </div>
      : null
  );
};

export default Modal;
