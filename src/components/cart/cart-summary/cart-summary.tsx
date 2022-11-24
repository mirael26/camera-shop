import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { postOrder } from '../../../store/api-action';
import { getDiscount, getProductsInCart, getPromocode } from '../../../store/selectors';
import { addPriceSeparators } from '../../../utils';
import Promocode from '../promocode/promocode';

const CartSummary = () => {
  const productsInCart = useSelector(getProductsInCart);
  const promocode = useSelector(getPromocode);
  const discount = useSelector(getDiscount);
  const dispatch = useAppDispatch();

  const handleOrderButtonCLick = () => {
    const order = {
      camerasIds: productsInCart.map((product) => product.id),
      coupon: promocode,
    };
    dispatch(postOrder(order));
  };

  const total = productsInCart.reduce((sum, product) => sum + product.countInCart * product.price, 0);
  const discountAmount = discount * total;
  const totalWithDiscount = (1 - discount) * total;

  return (
    productsInCart.length
      ?
      <div className="basket__summary">
        <Promocode/>
        <div className="basket__summary-order">
          <p className="basket__summary-item">
            <span className="basket__summary-text">Всего:</span>
            <span className="basket__summary-value" data-testid='total'>{addPriceSeparators(total)} ₽</span>
          </p>
          <p className="basket__summary-item">
            <span className="basket__summary-text">Скидка:</span>
            <span className={`basket__summary-value${discount > 0 ? ' basket__summary-value--bonus' : ''}`} data-testid='discount-amount'>{addPriceSeparators(discountAmount)} ₽</span>
          </p>
          <p className="basket__summary-item">
            <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
            <span className="basket__summary-value basket__summary-value--total" data-testid='total-with-discount'>{addPriceSeparators(totalWithDiscount)} ₽</span>
          </p>
          <button className="btn btn--purple" type="button" onClick={handleOrderButtonCLick}>Оформить заказ
          </button>
        </div>
      </div>
      : null
  );
};

export default CartSummary;
