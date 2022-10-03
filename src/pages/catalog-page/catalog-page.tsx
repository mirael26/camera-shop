import Header from '../../components/header/header';
import Promo from '../../components/promo/promo';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';

const CatalogPage = ():JSX.Element => (
  <>
    <Header />
    <main>
      <Promo />
      <div className="page-content">
        <Breadcrumbs />
        <Catalog />
      </div>
    </main>
  </>
);

export default CatalogPage;
