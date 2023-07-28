import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
      immutable: true,
    },
    comment: {
      type: String,
      required: true,
      max: 255,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Comment", commentSchema);
