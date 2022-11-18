import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Reviews from '../../components/reviews/reviews';
import SimilarProducts from '../../components/similar-products/similar-products';
import UpButton from '../../components/up-button/up-button';
import Product from '../../components/product/product';
import Modal from '../../components/modal/modal';

const ProductPage = ():JSX.Element => (
  <div data-testid='product-page' className="wrapper">
    <Header />
    <Modal />
    <main>
      <div className="page-content">
        <Breadcrumbs />
        <Product />
        <SimilarProducts />
        <Reviews />
      </div>
      <UpButton />
    </main>
    <Footer />
  </div>
);

export default ProductPage;
