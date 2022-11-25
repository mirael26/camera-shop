import { useState } from 'react';
import AddingToCartModalCard from './adding-to-cart-modal-card/adding-to-cart-modal-card';
import AddingToCartModalSuccess from './adding-to-cart-modal-success/adding-to-cart-modal-success';

const AddingToCartModalMode = {
  Add: 'add',
  Success: 'success',
} as const;

const AddingToCartModal = (): JSX.Element | null => {
  const [mode, setMode] = useState<typeof AddingToCartModalMode.Add | typeof AddingToCartModalMode.Success>(AddingToCartModalMode.Add);

  return (
    <div className={`modal__content${mode === AddingToCartModalMode.Success ? ' modal__content--narrow' : ''}`}>
      {mode === AddingToCartModalMode.Add && <AddingToCartModalCard onSuccess={() => setMode(AddingToCartModalMode.Success)} />}
      {mode === AddingToCartModalMode.Success && <AddingToCartModalSuccess/>}
    </div>
  );
};

export default AddingToCartModal;
