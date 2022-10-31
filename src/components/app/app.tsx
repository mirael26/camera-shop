import { AppUrl } from '../../consts';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import Redirect from '../redirect/redirect';
import AppRouter from './app-router/app-router';

const SCROLL_TO_TOP_CATALOG_EXCEPTION = `${AppUrl.Catalog}`;

const App = (): JSX.Element => {
  useScrollToTop([SCROLL_TO_TOP_CATALOG_EXCEPTION]);

  return (
    <>
      <Redirect />
      <AppRouter />
    </>
  );
};

export default App;
