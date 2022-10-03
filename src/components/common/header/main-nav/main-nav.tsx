import { Link, useLocation } from 'react-router-dom';
import { AppUrl } from '../../../../consts';

const MainNav = ():JSX.Element => {
  const { pathname } = useLocation();

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          {pathname === AppUrl.Catalog
            ? <span className="main-nav__link main-nav__link--disabled">Каталог</span>
            : <Link className="main-nav__link" to={AppUrl.Catalog}>Каталог</Link>}
        </li>
        <li className="main-nav__item"><a className="main-nav__link" href="#">Гарантии</a>
        </li>
        <li className="main-nav__item"><a className="main-nav__link" href="#">Доставка</a>
        </li>
        <li className="main-nav__item"><a className="main-nav__link" href="#">О компании</a>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
