import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingSlice } from "./slices/loadingSlice";
import { authSlice } from "./slices/authSlice";

const rootReducer = combineReducers({
  [loadingSlice.name]: loadingSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
