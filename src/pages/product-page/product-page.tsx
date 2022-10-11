import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import AddToCartModal from '../../components/modal/add-to-cart/add-to-cart';
import ReviewModal from '../../components/modal/review/review';
import Reviews from '../../components/reviews/reviews';
import SimilarProducts from '../../components/similar-products/similar-products';
import UpButton from '../../components/up-button/up-button';
import Product from '../../components/product/product';

const ProductPage = ():JSX.Element => (
  <div className="wrapper">
    <Header />
    <AddToCartModal />
    <ReviewModal />
    <main>
      <div className="page-content">
        <Breadcrumbs />
        <Product />
        <SimilarProducts />
        <Reviews />
      </div>
    </main>
    <UpButton />
    <Footer />
  </div>
);

export default ProductPage;
