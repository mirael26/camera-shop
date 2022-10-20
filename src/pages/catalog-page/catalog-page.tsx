import Header from '../../components/header/header';
import Promo from '../../components/promo/promo';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import AddToCartModal from '../../components/modal/add-to-cart-modal/add-to-cart-modal';

const CatalogPage = ():JSX.Element => (
  <div data-testid='catalog-page' className="wrapper">
    <Header />
    <AddToCartModal />
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
