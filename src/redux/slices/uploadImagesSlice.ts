import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface State {
  images: any[];
  totalImageCount?: number;
  isLoading: boolean;
  error?: Error | undefined;
}

const initialState: State = {
  images: [],
  isLoading: false,
};

export const imageUploadModalSlice = createSlice({
  name: "imageUploadModal",
  initialState,
  reducers: {
    updateUploadImages: (state, action: PayloadAction<State>): void => {
      Object.assign(state, action.payload);
    },
    resetUploadImages: (): State => {
      return initialState;
    },
  },
});

export const { updateUploadImages, resetUploadImages } =
  imageUploadModalSlice.actions;
