import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      max:255,
    },
    picture: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
      immutable:true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
