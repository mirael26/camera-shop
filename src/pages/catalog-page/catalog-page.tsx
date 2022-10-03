import Header from '../../components/header/header';
import Promo from '../../components/promo/promo';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';

const CatalogPage = ():JSX.Element => (
  <div className="wrapper">
    <Header />
    <main>
      <Promo />
      <div className="page-content">
        <Breadcrumbs />
        <Catalog />
      </div>
    </main>
    <Footer />
  </div>
);

export default CatalogPage;
