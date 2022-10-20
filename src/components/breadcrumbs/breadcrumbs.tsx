import { Link, useLocation } from 'react-router-dom';
import { AppUrl } from '../../consts';
import { useAppSelector } from '../../hooks/use-app-selector';

const BreadcrumbsProperties = {
  Main: {
    title: 'Главная',
    route: AppUrl.Main,
  },
  Catalog: {
    title: 'Каталог',
    route: AppUrl.Catalog,
  },
  Product: {
    title: null,
    route: AppUrl.Product,
  }
} as const;

const Breadcrumbs = (): JSX.Element => {
  const product = useAppSelector((state) => state.data.currentProduct);
  const { pathname } = useLocation();

  const getCrumbs = (url: string) => {
    const paths = url.split('/');
    const crumbs: Array<string> = [];

    paths.forEach((path) => {
      const crumb = Object.keys(BreadcrumbsProperties).find((crumbName) => BreadcrumbsProperties[crumbName as keyof typeof BreadcrumbsProperties].route === `/${path}`);
      if (crumb) {
        crumbs.push(crumb);
      }
    });

    return crumbs;
  };

  const paths = getCrumbs(pathname);

  return (
    <div className="breadcrumbs" data-testid='breadcrumbs'>
      <div className="container">
        <ul className="breadcrumbs__list">
          {paths && paths.map((path, i) => {
            const isLast = paths.length === i + 1;
            const properties = BreadcrumbsProperties[path as keyof typeof BreadcrumbsProperties];
            const key = `breadcrumb-${i}`;

            if (path === 'Product' && product) {
              return (
                <li key={key} className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">{product.name}</span>
                </li>
              );
            }

            return (
              <li key={key} className="breadcrumbs__item">
                {isLast
                  ? <span className="breadcrumbs__link breadcrumbs__link--active">{properties.title}</span>
                  :
                  <Link className="breadcrumbs__link" to={properties.route}>{properties.title}
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
