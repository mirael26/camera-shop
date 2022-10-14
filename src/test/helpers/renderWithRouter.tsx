import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from "react-router-dom";
import AppRouter from '../../components/app/app-router/app-router';

export const renderWithRouter = (component: ReactNode, initialRoute = '/') => {
    return render (
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppRouter/>
        {component}
      </MemoryRouter>
    );
};
