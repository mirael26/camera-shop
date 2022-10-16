import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from "react-router-dom";
import AppRouter from '../../components/app/app-router/app-router';
import { createReduxStore } from '../../store/store';

export const renderWithRouter = (component: ReactNode, initialRoute = '/') => {
  
  const store = createReduxStore();
    return render (
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <AppRouter/>
          {component}
        </MemoryRouter>
      </Provider>
    );
};
