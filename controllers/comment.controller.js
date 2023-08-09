import commentServices from "../services/comment.service.js";
import response from "../utils/response.js";

const createComment = async (req, res) => {
  const comment = await commentServices.createComment(req.user_id, req.body);
  response.success(res, comment, 201);
};

const getCommentById = async (req, res) => {
  const comment = await commentServices.getCommentById(req.params.id);
  response.success(res, comment, 200);
};

const getCommentsByVideoId = async (req, res) => {
  const comments = await commentServices.getCommentsByVideoId(req.params.id);
  response.success(res, comments, 200);
};

const updateComment = async (req, res) => {
  const updatedComment = await commentServices.updateComment(
    req.params.id,
    req.user_id,
    req.body,
  );
  response.success(res, updatedComment, 200);
};

const deleteComment = async (req, res) => {
  await commentServices.deleteComment(req.params.id);
  response.success(res, null, 204);
};

export {
  createComment,
  getCommentById,
  getCommentsByVideoId,
  updateComment,
  deleteComment,
};
