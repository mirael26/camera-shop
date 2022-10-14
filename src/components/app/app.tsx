import { HashRouter } from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Redirect from '../redirect/redirect';
import AppRouter from './app-router/app-router';

const App = (): JSX.Element => (
  <HashRouter>
    <ScrollToTop />
    <Redirect />
    <AppRouter />
  </HashRouter>
);

export default App;
