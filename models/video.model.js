import mongoose, { Schema } from "mongoose";
import { nanoid } from 'nanoid'

const videoSchema = new Schema(
  {
    _id: {
      type: String,
      default: ()=> nanoid(10)
    },
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
      default: 0,
    },
    user: {
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
