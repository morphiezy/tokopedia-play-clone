import Comment from "../models/comment.model.js";
import Video from "../models/video.model.js";
import throwError from "../utils/error.js";
import validator from "../utils/validator.js";

const commentServices = {

    async createComment(user_id, data) {
        const userId = validator.mongooseId(user_id);
        const commentData = {...data, user_id: userId};

        if(data.video_id) {
            const video = await Video.findById(data.video_id);
            if(!video) {
                throwError(404, "video not found");
            }
        }

        const commentDoc = new Comment(commentData);
        return commentDoc.save();
    },

    async getCommentsByVideoId(video_id) {
        const videoId = validator.mongooseId(video_id);
        const video = await Video.findById(videoId);

        if(!video) {
            throwError(404, "video not found");
        }

        return Comment.find({ video_id: videoId }, 'comment createdAt')
        .populate({path: 'user_id', select: '-_id username'})
    },

    getCommentById(comment_id) {
        const commentId = validator.mongooseId(comment_id);
        return Comment.findById(commentId);
    },

    updateComment(comment_id, data) {
        const id = validator.mongooseId(comment_id);
        return Comment.findByIdAndUpdate(id, data, { new : true, select : 'username comment updatedAt'});
    },

    deleteComment(comment_id) {
        const id = validator.mongooseId(comment_id);
        return Comment.findByIdAndDelete(id);
    },

}

export default commentServices;