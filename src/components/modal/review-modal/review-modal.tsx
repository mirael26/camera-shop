import { useSelector } from 'react-redux';
import { getReviewModalStatus } from '../../../store/selectors';
import ReviewModalContent from './review-modal-content/review-modal-content';

const ReviewModal = (): JSX.Element | null => {
  const isOpen = useSelector(getReviewModalStatus);

  return (
    isOpen
      ? <ReviewModalContent />
      : null
  );
};

export default ReviewModal;
