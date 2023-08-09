import Comment from "../models/comment.model.js";
import Video from "../models/video.model.js";
import ErrorHandler from "../utils/error.js";
import validator from "../utils/validator.js";
import videoServices from "./video.service.js";

const commentServices = {

  createComment: async (user_id, comment_data) => {

    const userId = validator.mongooseId(user_id);
    const videoId = validator.mongooseId(comment_data?.video_id);

    const emptyFields = ["video_id", "comment"]
    .filter((item) => !comment_data[item])
    .join(",");

    if (emptyFields) {
      throw new ErrorHandler(`${emptyFields} is required`, 400);
    }

    const video = await Video.findById(videoId);

    if (!video) {
      throw new ErrorHandler("video not available", 400);
    }

    const commentDoc = new Comment({ ...comment_data, user_id: userId });
    const { comment, createdAt } = await commentDoc.save();

    return {
      comment,
      createdAt,
    };
  },

  getCommentsByVideoId: async (video_id) => {
    const video = await videoServices.getVideoById(video_id);

    return Comment.find({ video_id: video._id }, "comment createdAt").populate({
      path: "user_id",
      select: "-_id username",
    });
  },

  getCommentById: (comment_id) => {
    const commentId = validator.mongooseId(comment_id);
    return Comment.findById(commentId);
  },

  updateComment: async (comment_id, user_id, comment_data) => {
    const commentId = validator.mongooseId(comment_id);
    const videoId = validator.mongooseId(comment_data?.video_id);
    const userId = validator.mongooseId(user_id);

    const emptyFields = ["video_id", "comment"]
    .filter((item) => !comment_data[item])
    .join(",");

    if (emptyFields) {
      throw new ErrorHandler(`${emptyFields} is required`, 400);
    }

    const updatedComment = await Comment.findOneAndUpdate(
      {
        _id: commentId,
        user_id: userId,
        video_id: videoId,
      },
      { comment: comment_data.comment },
      { new: true, select: "-_id comment updatedAt" },
    );

    if(!updatedComment) {
      throw new ErrorHandler("updated comment failed", 400);
    }

    return updatedComment;
  },

  deleteComment: (comment_id) => {
    const commentId = validator.mongooseId(comment_id);
    return Comment.findByIdAndDelete(commentId);
  }

};

export default commentServices;
