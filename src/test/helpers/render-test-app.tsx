import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { createReduxStore } from '../../store/store';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../../components/app/app-router/app-router';

export const renderTestApp = (component: ReactNode, options?: {initialState?: {[key: string]: unknown}; route?: string }) => {
  const store = createReduxStore(options?.initialState);

  return render (
    <Provider store={store}>
      <MemoryRouter initialEntries={[options?.route || '/']}>
        <AppRouter/>
        {component}
      </MemoryRouter>
    </Provider>
  );
};
