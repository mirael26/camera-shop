import { useState } from 'react';
import { Modal } from '../../../../consts';
import { useModalClose } from '../../../../hooks/use-modal-close';
import ReviewForm from '../review-form/review-form';
import ReviewSuccess from '../review-success/review-success';

export const ReviewMode = {
  Form: 'reviewForm',
  Success: 'success',
} as const;

const ReviewModalContent = () => {
  const [mode, setMode] = useState<typeof ReviewMode.Form | typeof ReviewMode.Success>(ReviewMode.Form);

  const { onModalClose } = useModalClose({ modalName: Modal.Review });

  const handleOverlayClick = (evt: React.MouseEvent) => {
    const element = evt.target as Element;
    const isOverlay = element.classList.contains('modal__overlay');
    const isModal = element.classList.contains('modal__content');
    if (isOverlay && !isModal) {
      onModalClose();
    }
  };

  return (
    <div className={`modal is-active${mode === 'success' ? ' modal--narrow' : ''}`} data-testid='review-modal'>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick} data-testid='modal-overlay'></div>

        {mode === 'reviewForm' && <ReviewForm onSuccess={() => setMode('success')} onModalClose={onModalClose} />}
        {mode === 'success' && <ReviewSuccess onModalClose={onModalClose}/>}

      </div>
    </div>
  );
};

export default ReviewModalContent;