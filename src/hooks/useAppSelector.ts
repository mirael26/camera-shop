import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TRootReducer } from '../store/store';

export const useAppSelector: TypedUseSelectorHook<TRootReducer> = useSelector;
