import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface State {
  isLoading: boolean;
  error?: string | null;
}

// type Action = {
//   type: string;
//   payload: boolean;
// };

const initialState: State = {
  isLoading: true,
  error: null,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state: State, action: PayloadAction<boolean>): void => {
      state.isLoading = action.payload;
    },
    setError: (state: State, action: PayloadAction<string>): void => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = loadingSlice.actions;
