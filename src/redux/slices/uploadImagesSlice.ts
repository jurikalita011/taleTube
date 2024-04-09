import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface State {
  isOpen?: boolean;
  images?: any[];
  totalImageCount?: number;
  isLoading?: boolean;
  error?: Error | undefined;
}

const initialState: State = {
  images: [],
  isLoading: false,
  isOpen: false,
};

export const imageUploadModalSlice = createSlice({
  name: "imageUploadModal",
  initialState,
  reducers: {
    updateUploadImages: (state, action: PayloadAction<State>): void => {
      Object.assign(state, action.payload);
    },
    toogleImageModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    resetUploadImages: (): State => {
      return initialState;
    },
  },
});

export const { updateUploadImages, resetUploadImages, toogleImageModal } =
  imageUploadModalSlice.actions;
