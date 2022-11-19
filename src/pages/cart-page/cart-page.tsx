import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Modal from '../../components/modal/modal';
import Cart from '../../components/cart/cart';

const CartPage = ():JSX.Element => (
  <div className="wrapper">
    <Header/>
    <Modal/>
    <main>
      <div className="page-content">
        <Breadcrumbs/>
        <Cart/>
      </div>
    </main>
    <Footer/>
  </div>
);

export default CartPage;
