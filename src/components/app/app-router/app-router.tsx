import { AppUrl } from '../../../consts';
import CatalogPage from '../../../pages/catalog-page/catalog-page';
import ProductPage from '../../../pages/product-page/product-page';
import NotFoundPage from '../../../pages/not-found-page/not-found-page';
import ServerUnavailablePage from '../../../pages/server-unavailable-page/server-unavailable-page';
import { Navigate, Route, Routes } from 'react-router-dom';

const AppRouter = () => (
  <Routes>
    <Route path={AppUrl.Main} element={<Navigate replace to={AppUrl.Catalog} />}/>
    <Route path={AppUrl.Catalog} element={<CatalogPage />}/>
    <Route path={`${AppUrl.Catalog}${AppUrl.Page}:page`} element={<CatalogPage />}/>
    <Route path={`${AppUrl.Catalog}${AppUrl.Product}/:id`} element={<ProductPage />}/>
    <Route path={`${AppUrl.Catalog}${AppUrl.Product}/:id/:tab`} element={<ProductPage />}/>
    <Route path={AppUrl.NotFound} element={<NotFoundPage />}/>
    <Route path={AppUrl.ServerUnavailable} element={<ServerUnavailablePage />}/>
    <Route path='/*' element={<NotFoundPage />}/>
  </Routes>
);

export default AppRouter;