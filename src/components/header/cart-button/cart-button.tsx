const CartButton = () => (
  <a className="header__basket-link" href='https://example.com'>
    <svg width="16" height="16" aria-hidden="true">
      <use xlinkHref="#icon-basket"></use>
    </svg>
    <span className="header__basket-count">3</span>
  </a>
);

export default CartButton;
