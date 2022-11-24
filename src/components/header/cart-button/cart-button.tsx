import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppUrl } from '../../../consts';
import { getProductsInCartCount } from '../../../store/selectors';

const CartButton = () => {
  const productsCount = useSelector(getProductsInCartCount);

  return (
    <Link to={`${AppUrl.Catalog}${AppUrl.Cart}`} className="header__basket-link">
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      {productsCount ? <span className="header__basket-count" data-testid='header-cart-counter'>{productsCount}</span> : null}
    </Link>
  );
};

export default CartButton;
