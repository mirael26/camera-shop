import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppUrl } from '../../consts';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

const App = (): JSX.Element => (
  <HashRouter>
    <ScrollToTop />
    <Routes>
      <Route path={AppUrl.Main} element={<Navigate replace to={AppUrl.Catalog} />}/>
      <Route path={AppUrl.Catalog} element={<CatalogPage />}/>
      <Route path={`${AppUrl.Catalog}${AppUrl.Page}:page`} element={<CatalogPage />}/>
      <Route path={`${AppUrl.Catalog}${AppUrl.Product}/:id`} element={<ProductPage />}/>
      <Route path={`${AppUrl.Catalog}${AppUrl.Product}/:id/:tab`} element={<ProductPage />}/>
      <Route path={AppUrl.NotFound} element={<NotFoundPage />}/>
      <Route path='/*' element={<NotFoundPage />}/>
    </Routes>
  </HashRouter>
);

export default App;
