import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TAppDispatch, TRootReducer } from '../store/store';

export const useAppDispatch: () => TAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootReducer> = useSelector;
