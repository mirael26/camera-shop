import { useSelector } from 'react-redux';
import { getAddingToCartItem, getAddToCartModalStatus } from '../../../store/selectors';
import AddToCartModalContent from './add-to-cart-modal-content/add-to-cart-modal-content';

const AddToCartModal = (): JSX.Element | null => {
  const isOpen = useSelector(getAddToCartModalStatus);
  const product = useSelector(getAddingToCartItem);

  return (
    <div className={`modal${isOpen && product ? ' is-active' : ''}`} data-testid='add-to-cart-modal'>
      {isOpen && product && <AddToCartModalContent product={product} />}
    </div>
  );
};

export default AddToCartModal;
