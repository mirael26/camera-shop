import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dataReducer } from './reducers/data-reducer';
import { stateReducer } from './reducers/state-reducer';

const rootReducer = combineReducers({data: dataReducer, state: stateReducer});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type TRootReducer = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export default store;
