import { useAppSelector } from '../../../hooks/useAppSelector';
import AddToCartModalContent from './modal-content/modal-content';

const AddToCartModal = (): JSX.Element | null => {
  const isOpen = useAppSelector((state) => state.state.addToCartModalOpen);
  const product = useAppSelector((state) => state.state.addingToCartItem);

  return (
    <div className={`modal${isOpen && product ? ' is-active' : ''}`}>
      {isOpen && product && <AddToCartModalContent product={product} />}
    </div>
  );
};

export default AddToCartModal;
