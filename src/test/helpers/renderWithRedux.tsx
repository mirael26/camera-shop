import { createReduxStore } from "../../store/store";
import { Provider } from "react-redux";
import { render } from '@testing-library/react';
import { ReactNode } from 'react';

export const renderWithRedux = (component: ReactNode, initialState?: any) => {
    const store = createReduxStore(initialState);

    return render (
      <Provider store={store}>
        {component}
      </Provider>
    );
};
