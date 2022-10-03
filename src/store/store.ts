import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dataReducer } from './reducers/data-reducer';

const rootReducer = combineReducers({data: dataReducer});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type TRootReducer = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export default store;
