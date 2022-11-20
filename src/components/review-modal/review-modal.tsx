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
    <>
      {mode === ReviewModalMode.Form && <ReviewModalForm onSuccess={() => setMode(ReviewModalMode.Success)} />}
      {mode === ReviewModalMode.Success && <ReviewModalSuccess/>}
    </>
  );
};

export default ReviewModal;
