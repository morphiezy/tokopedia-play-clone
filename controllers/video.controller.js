import videoServices from "../services/video.service.js";
import response from "../utils/response.js";

const createVideo = async (req, res) => {
  try {
    const { title, youtube_url } = req.body;
    const userId = req.user_id;
    
    if(!userId) {
      return response.failed(res, "Forbidden", 403);
    }
    if (!(title && youtube_url && userId)) {
      return response.failed(res, "Failed to create video.", 400);
    }

    const data = await videoServices.createVideo(userId, title, youtube_url);
    return response.success(res, data, 201);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
};

const getAllVideo = async (_, res) => {
  try {
    const videos = await videoServices.getAllVideos();
    response.success(res, videos, 200);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
};

const getVideoById = async (req, res) => {
  try {
    const video = await videoServices.getVideoById(req.params.id);
    response.success(res, video, 200);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
};

const getVideoByUserId = async(req, res) => {
  try {
    const userId = req.params.id;
    
    if(!userId) {
      response.failed(res, "user id is required", 400);
    }

    const videos = await videoServices.getVideosByUserId(userId);
    response.success(res, videos, 200);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
}

const updateVideoById = async (req, res) => {
  try {
    const data = req.body;
    const updatedVideo = await videoServices.updateVideoById(
      req.params.id,
      data,
    );
    response.success(res, updatedVideo, 200);
  } catch (error) {
    response.failed(res, "Update video failed");
  }
};

const deleteVideoByID = async (req, res) => {
  try {
    await videoServices.deleteVideoById(req.params.id);
    response.success(res, null, 204);
  } catch (error) {
    response.failed(res, error.message, error.status);
  }
};

export {
  createVideo,
  getAllVideo,
  getVideoById,
  getVideoByUserId,
  updateVideoById,
  deleteVideoByID,
};
