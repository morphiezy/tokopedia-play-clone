import commentServices from "../services/comment.service.js";
import response from "../utils/response.js";

const createComment = async (req, res) => {
  try {
    const userId = req.user_id;
    const data = req.body;
    
    if(!userId) {
      return response.failed(res, "Forbidden", 403);
    }

    const comment = await commentServices.createComment(userId, data);
    response.success(res, comment, 201);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
};

const getCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await commentServices.getCommentById(id);
    response.success(res, comment, 200);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
};

const getCommentsByVideoId = async (req, res) => {
  try {
    const videoId = req.params.id;
    const comments = await commentServices.getCommentsByVideoId(videoId);
    response.success(res, comments, 200);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
};

const updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const comment = await commentServices.updateComment(id, data);
    response.success(res, comment, 200);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
};

const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    await commentServices.deleteComment(id);
    response.success(res, null, 204);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
}

export { 
  createComment, 
  getCommentById, 
  getCommentsByVideoId, 
  updateComment, 
  deleteComment 
};
