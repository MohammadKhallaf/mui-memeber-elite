import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import membersSlice from 'src/modules/members/members.slice';

const store = configureStore({
  reducer: {
    members: membersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
