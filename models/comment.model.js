import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    video: {
      type: String,
      ref: "Video",
      required: true,
      immutable: true,
    },
    text: {
      type: String,
      required: true,
      max: 255,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Comment", commentSchema);
