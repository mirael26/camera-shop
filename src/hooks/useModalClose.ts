import { useEffect } from 'react';
import { ActionCreator } from '../store/action';
import { TModal } from '../types/data.type';
import { useAppDispatch } from './useAppDispatch';

interface IuseModalCloseProps {
  modalName: TModal;
  cleanCallback?: () => any;
}

export const useModalClose = ({ modalName, cleanCallback }: IuseModalCloseProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onModalClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    document.querySelector('header')?.setAttribute('inert', 'inert');
    document.querySelector('main')?.setAttribute('inert', 'inert');
    document.querySelector('footer')?.setAttribute('inert', 'inert');
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'visible';
    };
  }, []);

  const onModalClose = () => {
    dispatch(ActionCreator.CloseModal(modalName));
    if (cleanCallback) {
      cleanCallback();
    }
    document.querySelector('header')?.removeAttribute('inert');
    document.querySelector('main')?.removeAttribute('inert');
    document.querySelector('footer')?.removeAttribute('inert');
  };

  return { onModalClose };
};
