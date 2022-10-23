import { BrowserRouter } from 'react-router-dom';
import Redirect from '../redirect/redirect';
import AppRouter from './app-router/app-router';

const App = (): JSX.Element => (
  <BrowserRouter>
    <Redirect />
    <AppRouter />
  </BrowserRouter>
);

export default App;
