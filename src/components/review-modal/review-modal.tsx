import { useState } from 'react';
import ReviewModalForm from './review-modal-form/review-modal-form';
import ReviewModalSuccess from './review-modal-success/review-modal-success';

export const ReviewModalMode = {
  Form: 'reviewForm',
  Success: 'success',
} as const;

const ReviewModal = (): JSX.Element | null => {
  const [mode, setMode] = useState<typeof ReviewModalMode.Form | typeof ReviewModalMode.Success>(ReviewModalMode.Form);

  return (
    <div className={`modal__content${mode === ReviewModalMode.Success ? ' modal__content--narrow' : ''}`}>
      {mode === ReviewModalMode.Form && <ReviewModalForm onSuccess={() => setMode(ReviewModalMode.Success)} />}
      {mode === ReviewModalMode.Success && <ReviewModalSuccess/>}
    </div>
  );
};

export default ReviewModal;
