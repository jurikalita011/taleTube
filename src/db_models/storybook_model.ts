import mongoose from "mongoose";

const storyBookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  previewImage: { type: String, required: true },
  srcVideoUrl: { type: String, required: true },
  previewVideoUrl: { type: String, required: false },
  bgImage: { type: String, required: true },
  color: { type: [String], required: true },
  duration: { type: String, required: true },
  category: {
    type: [mongoose.Types.ObjectId],
    ref: "categories",
    required: true,
  },
  isExclusive: { type: Boolean, required: false, default: false },

  // if we want to sell the product separately.
  isStandAloneExclusive: { type: Boolean, required: false, default: false },

  isEarlyExplore: { type: Boolean, required: false, default: false },
  slidePictures: { type: [String], required: false, default: [] },
  ageGroup: { type: String, required: true },
  language: { type: String, required: true },
  totalViewCount: { type: Number, required: false, default: 0 },
});

const StoryBookModel =
  mongoose.models.storybooks || mongoose.model("storybooks", storyBookSchema);

export { StoryBookModel };
