import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Redirect from '../redirect/redirect';
import AppRouter from './app-router/app-router';

const App = (): JSX.Element => (
  <BrowserRouter>
    <ScrollToTop />
    <Redirect />
    <AppRouter />
  </BrowserRouter>
);

export default App;
