import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppUrl } from '../../consts';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import CartPage from '../../pages/cart-page/cart-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

const App = (): JSX.Element => (
  <HashRouter>
    <Routes>
      <Route path={AppUrl.Main} element={<Navigate replace to={AppUrl.Catalog} />}/>
      <Route path={AppUrl.Catalog} element={<CatalogPage />}/>
      <Route path={AppUrl.Product} element={<ProductPage />}/>
      <Route path={AppUrl.Cart} element={<CartPage />}/>
      <Route path={AppUrl.NotFound} element={<NotFoundPage />}/>
    </Routes>
  </HashRouter>
);

export default App;
