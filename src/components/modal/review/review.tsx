import { useState } from 'react';
import ReviewForm from './form/form';
import ThanksModal from './thanks/thanks';

const ReviewModal = () => {
  const [mode, setMode] = useState<'reviewForm' | 'thanks'>('reviewForm');

  /*eslint-disable */
  /*eslint-enable */

  return (
    <>
      {mode === 'reviewForm' && <ReviewForm showThanks={() => setMode('thanks')} />}
      {mode === 'thanks' && <ThanksModal />}
    </>
  );
};

export default ReviewModal;
