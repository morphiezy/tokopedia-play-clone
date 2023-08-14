import Comment from "../models/comment.model.js";
import Video from "../models/video.model.js";
import ErrorHandler from "../utils/error.js";
import validator from "../utils/validator.js";
// import videoServices from "./video.service.js";

const commentServices = {

  createComment: async (user_id, comment_data) => {

    const userId = validator.mongooseId(user_id);

    const emptyFields = ["video", "text"]
    .filter((item) => !comment_data[item])
    .join(",");

    if (emptyFields) {
      throw new ErrorHandler(`${emptyFields} is required`, 400);
    }

    const video = await Video.findById(comment_data?.video);

    if (!video) {
      throw new ErrorHandler("video not available", 400);
    }

    const commentDoc = new Comment({ ...comment_data, user: userId });
    const { comment, createdAt } = await commentDoc.save();

    return {
      comment,
      createdAt,
    };
  },

  getCommentsByVideoId: async (video_id) => {
    return Comment.find({ video: video_id }, "text createdAt").populate({
      path: "user",
      select: "-_id username picture",
    }).sort({createdAt: -1})
  },

  getCommentById: (comment_id) => {
    const commentId = validator.mongooseId(comment_id);
    return Comment.findById(commentId);
  },

  updateComment: async (comment_id, user_id, comment_data) => {
    const commentId = validator.mongooseId(comment_id);
    const userId = validator.mongooseId(user_id);

    const emptyFields = ["video", "text"]
    .filter((item) => !comment_data[item])
    .join(",");

    if (emptyFields) {
      throw new ErrorHandler(`${emptyFields} is required`, 400);
    }

    const updatedComment = await Comment.findOneAndUpdate(
      {
        _id: commentId,
        user: userId,
        video: comment_data.video,
      },
      { text: comment_data.text },
      { new: true, select: "-_id text updatedAt" },
    );

    if(!updatedComment) {
      throw new ErrorHandler("updated comment failed", 400);
    }

    delete comment_data._id;

    return updatedComment;
  },

  deleteComment: (comment_id) => {
    const commentId = validator.mongooseId(comment_id);
    return Comment.findByIdAndDelete(commentId);
  }

};

export default commentServices;
