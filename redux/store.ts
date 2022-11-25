import {configureStore, ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';
import { motiveApi } from './api'
import {createWrapper} from 'next-redux-wrapper';
import { useDispatch } from 'react-redux'
import authSlice from './reducers/auth-slice';
// ...

export const makeStore = () =>
    configureStore({
        reducer: {
          [motiveApi.reducerPath]: motiveApi.reducer,
          authSlice: authSlice.reducer
        },
        devTools: true,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(motiveApi.middleware)
    });
const store = makeStore()
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export type AppDispatch = typeof store.dispatch

export const wrapper = createWrapper<AppStore>(makeStore);