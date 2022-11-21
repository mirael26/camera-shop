import { useSelector } from 'react-redux';
import { getProductsInCart } from '../../store/selectors';
import CartProductCard from './cart-product-card/cart-product-card';
import CartSummary from './cart-summary/cart-summary';

const Cart = () => {
  const productsInCart = useSelector(getProductsInCart);

  return (
    <section className="basket">
      <div className="container">
        <h1 className="title title--h2">Корзина</h1>
        <ul className="basket__list">
          {productsInCart.length
            ? productsInCart.map((product, i) => {
              const key = `product-in-cart-${i}`;
              return (
                <CartProductCard key={key} product={product}/>
              );
            })
            : <p className="title title--h2 basket__empty-message">Корзина пуста</p>}
        </ul>
        <CartSummary/>
      </div>
    </section>
  );
};

export default Cart;
