import { useAppSelector } from '../../../hooks/use-app-selector';
import AddToCartModalContent from './add-to-cart-modal-content/add-to-cart-modal-content';

const AddToCartModal = (): JSX.Element | null => {
  const isOpen = useAppSelector((state) => state.view.addToCartModalOpen);
  const product = useAppSelector((state) => state.view.addingToCartItem);

  return (
    <div className={`modal${isOpen && product ? ' is-active' : ''}`} data-testid='add-to-cart-modal'>
      {isOpen && product && <AddToCartModalContent product={product} />}
    </div>
  );
};

export default AddToCartModal;
