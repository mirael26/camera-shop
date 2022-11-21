import { useState } from 'react';
import AddToCartModalCard from '../add-to-cart-modal-card/add-to-cart-modal-card';
import AddToCartModalSuccess from './add-to-cart-modal-success/add-to-cart-modal-success';

const AddToCartModalMode = {
  Add: 'add',
  Success: 'success',
} as const;

const AddToCartModal = (): JSX.Element | null => {
  const [mode, setMode] = useState<typeof AddToCartModalMode.Add | typeof AddToCartModalMode.Success>(AddToCartModalMode.Add);

  return (
    <div className={`modal__content${mode === AddToCartModalMode.Success ? ' modal__content--narrow' : ''}`}>
      {mode === AddToCartModalMode.Add && <AddToCartModalCard onSuccess={() => setMode(AddToCartModalMode.Success)} />}
      {mode === AddToCartModalMode.Success && <AddToCartModalSuccess/>}
    </div>
  );
};

export default AddToCartModal;
