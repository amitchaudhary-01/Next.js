import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: [true, "Headline is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    publisher: {
      type: String,
      required: [true, "Publisher name is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Optional: Index for efficient sorting of latest news articles
newsSchema.index({ createdAt: -1 });

export const News = mongoose.models.News || mongoose.model("News", newsSchema);