import { configureStore} from '@reduxjs/toolkit'
import { motiveApi } from './api'
// ...
export const store = configureStore({
  reducer: {
    [motiveApi.reducerPath]: motiveApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(motiveApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch