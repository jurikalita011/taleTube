import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface State {
  isOpen?: boolean;
  requiredAspectRatio?: string;
  uploadedImages?: Array<string>;
  isLoading?: boolean;
  error?: Error | undefined;
}

const initialState: State = {
  uploadedImages: [],
  isLoading: false,
  isOpen: false,
};

export const imageUploadModalSlice = createSlice({
  name: "image_upload_modal",
  initialState,
  reducers: {
    setUploadedImages: (state, action: PayloadAction<Array<string>>): void => {
      state.uploadedImages = action.payload;
    },
    appendUploadedImages: (
      state,
      action: PayloadAction<Array<string>>
    ): void => {
      if (
        state.uploadedImages === undefined ||
        state.uploadedImages.length === 0
      ) {
        state.uploadedImages = action.payload;
      } else
        state.uploadedImages = [...action.payload, ...state.uploadedImages];
    },
    toogleImageModal: (state, action: PayloadAction<string>) => {
      state.isOpen = !state.isOpen;
      state.requiredAspectRatio = action.payload;
    },
    resetUploadImages: (): State => {
      return initialState;
    },
  },
});

export const {
  setUploadedImages,
  appendUploadedImages,
  resetUploadImages,
  toogleImageModal,
} = imageUploadModalSlice.actions;
