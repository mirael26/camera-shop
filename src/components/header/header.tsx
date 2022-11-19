import { Link } from 'react-router-dom';
import { AppUrl } from '../../consts';
import Search from '../search/search';
import CartButton from './cart-button/cart-button';
import MainNav from './main-nav/main-nav';

const Header = ():JSX.Element => (
  <header className="header" id="header">
    <div className="container">
      <Link className="header__logo" to={AppUrl.Main} aria-label="Переход на главную">
        <svg width="100" height="36" aria-hidden="true">
          <use xlinkHref="#icon-logo"></use>
        </svg>
      </Link>
      <div className="header__main-nav">
        <MainNav/>
      </div>
      <Search/>
      <CartButton/>
    </div>
  </header>
);

export default Header;
