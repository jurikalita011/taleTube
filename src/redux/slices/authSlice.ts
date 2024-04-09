import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@auth0/nextjs-auth0/client";

type Error = {
  name: string;
  message: string;
  stack?: string;
};

interface State {
  isAuth: boolean;
  user: UserProfile | undefined;
  error?: Error | undefined;
  isInitialCheckWithAuth0Done: boolean;
}

const initialState: State = {
  isAuth: false,
  user: undefined,
  error: undefined,
  isInitialCheckWithAuth0Done: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<State>): void => {
      Object.assign(state, action.payload);
      console.log("State from authSlice -->", state);
    },
    resetAuthState: (): State => {
      return initialState;
    },
  },
});

export const { setAuthState, resetAuthState } = authSlice.actions;
