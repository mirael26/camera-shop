import { Provider } from "react-redux";
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { createReduxStore } from '../../store/store';
import { MemoryRouter } from 'react-router-dom';

export const renderWithReduxAndRouter = (component: ReactNode, options?: {initialState?: any, route?: string }) => {
  const store = createReduxStore(options?.initialState);

  return render (
    <Provider store={store}>
      <MemoryRouter initialEntries={[options?.route || '/']}>
        {component}
      </MemoryRouter>
    </Provider>
  );
};
