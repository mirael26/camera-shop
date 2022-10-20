import { useAppSelector } from '../../../hooks/use-app-selector';
import ReviewModalContent from './modal-content/modal-content';

const ReviewModal = (): JSX.Element | null => {
  const isOpen = useAppSelector((state) => state.state.reviewModalOpen);

  return (
    isOpen
      ? <ReviewModalContent />
      : null
  );
};

export default ReviewModal;
