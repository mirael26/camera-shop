import { Link, useLocation } from 'react-router-dom';
import { AppUrl } from '../../consts';

const Footer = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <footer className="footer" data-testid='footer'>
      <div className="container">
        <div className="footer__info">
          <Link className="footer__logo" to={AppUrl.Main} aria-label="Переход на главную">
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo-mono"></use>
            </svg>
          </Link>
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <ul className="social">
            <li className="social__item">
              <a className="link" href="example.com" aria-label="Переход на страницу вконтакте">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-vk"></use>
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a className="link" href="example.com" aria-label="Переход на страницу pinterest">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest"></use>
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a className="link" href="example.com" aria-label="Переход на страницу reddit">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-reddit"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <ul className="footer__list">
              <li className="footer__item">
                {pathname === AppUrl.Catalog
                  ? <span className="link link--disabled">Каталог</span>
                  : <Link className="link" to={AppUrl.Catalog}>Каталог</Link>}
              </li>
              <li className="footer__item">
                <a className="link" href="example.com">Гарантии
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="example.com">Доставка
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="example.com">О компании
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="example.com">Курсы операторов
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="example.com">Блог
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="example.com">Сообщество
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="example.com">FAQ
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="example.com">Задать вопрос
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
