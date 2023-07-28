import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      max: 255,
    },
    youtube_url: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    views: {
      type: Number,
      default:0,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Video", videoSchema);
