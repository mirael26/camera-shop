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
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const onModalClose = () => {
    dispatch(ActionCreator.CloseModal(modalName));
    if (cleanCallback) {
      cleanCallback();
    }
  };

  return { onModalClose };
};
