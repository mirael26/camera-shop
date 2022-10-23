import { useCallback, useEffect } from 'react';
import { ActionCreator } from '../store/action';
import { TModal } from '../types/app.type';
import { useAppDispatch } from './use-app-dispatch';

interface IuseModalCloseProps {
  modalName: TModal;
  cleanCallback?: () => void;
}

export const useModalClose = ({ modalName, cleanCallback }: IuseModalCloseProps) => {
  const dispatch = useAppDispatch();

  const onModalClose = useCallback(() => {
    dispatch(ActionCreator.CloseModal(modalName));
    if (cleanCallback) {
      cleanCallback();
    }
    document.querySelector('header')?.removeAttribute('inert');
    document.querySelector('main')?.removeAttribute('inert');
    document.querySelector('footer')?.removeAttribute('inert');
  }, [dispatch, cleanCallback, modalName]);

  const handleEscClick = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onModalClose();
    }
  }, [onModalClose]);

  const handleBackButtonClick = useCallback((evt: PopStateEvent) => {
    evt.preventDefault();
    onModalClose();
  }, [onModalClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscClick);
    window.addEventListener('popstate', handleBackButtonClick);

    document.body.style.overflow = 'hidden';
    document.querySelector('header')?.setAttribute('inert', 'inert');
    document.querySelector('main')?.setAttribute('inert', 'inert');
    document.querySelector('footer')?.setAttribute('inert', 'inert');
    return () => {
      document.removeEventListener('keydown', handleEscClick);
      window.removeEventListener('popstate', handleBackButtonClick);
      document.body.style.overflow = 'visible';
    };
  }, [handleEscClick, handleBackButtonClick]);

  return { onModalClose };
};
