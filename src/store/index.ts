import { configureStore } from "@reduxjs/toolkit";
import comandaReducer from "./slices/comanda-slice";
import spinnerSlice from "./slices/spinner-slice";

export const Store = configureStore({
  reducer: { comandaReducer, spinnerSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
