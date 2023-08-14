import videoServices from "../services/video.service.js";
import response from "../utils/response.js";

const createVideo = async (req, res) => {
  const { title, youtube_url } = req.body;

  if (!(title && youtube_url)) {
    return response.failed(res, "title & youtube url is required", 400);
  }

  const data = await videoServices.createVideo(req.user_id, req.body);
  return response.success(res, data, 201);
};

const getAllVideo = async (req, res) => {
  const videos = await videoServices.getAllVideos(req.query.category);
  response.success(res, videos, 200);
};

const getVideoById = async (req, res) => {
  const video = await videoServices.getVideoById(req.params.id);
  response.success(res, video, 200);
};

const watchVideo = async (req, res) => {
  const videoDoc = await videoServices.getVideoById(req.params.id);
  await videoServices.updateViewsVideo(videoDoc);
  response.success(res, null, 204);
};

const getVideoByUserId = async (req, res) => {
  const userId = req.params.id;
  const videos = await videoServices.getVideosByUserId(userId);
  response.success(res, videos, 200);
};

const searchVideo = async (req,res) => {
  const videos = await videoServices.searchVideo(req.query.title);
  response.success(res, videos, 200);
}

const updateVideo = async (req, res) => {
  const updatedVideo = await videoServices.updateVideo(
    req.user_id,
    req.params.id,
    req.body,
  );

  response.success(res, updatedVideo, 200);
};

const deleteVideo = async (req, res) => {
  await videoServices.deleteVideo(req.params.id);
  response.success(res, null, 204);
};

export {
  createVideo,
  getAllVideo,
  getVideoById,
  watchVideo,
  getVideoByUserId,
  updateVideo,
  deleteVideo,
  searchVideo
};
