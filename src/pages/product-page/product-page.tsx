import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Reviews from '../../components/reviews/reviews';
import SimilarProducts from '../../components/similar-products/similar-products';
import UpButton from '../../components/up-button/up-button';
import Product from '../../product/product';

const ProductPage = ():JSX.Element => (
  <div className="wrapper">
    <Header />
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
