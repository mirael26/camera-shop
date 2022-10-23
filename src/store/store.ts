import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dataReducer } from './reducers/data-reducer';
import { viewReducer } from './reducers/view-reducer';

export const createReduxStore = (initialState = {}) => (
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  })
);

const rootReducer = combineReducers({data: dataReducer, view: viewReducer});

const store = createReduxStore();

export type TRootReducer = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export default store;
