import {configureStore, ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';
import { motiveApi } from './api'
import {createWrapper} from 'next-redux-wrapper';
// ...

export const makeStore = () =>
    configureStore({
        reducer: {
          [motiveApi.reducerPath]: motiveApi.reducer,
        },
        devTools: true,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(motiveApi.middleware)
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);