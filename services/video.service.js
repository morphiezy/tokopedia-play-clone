import Video from "../models/video.model.js";
import Product from "../models/product.model.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import validator from "../utils/validator.js";
import ErrorHandler from "../utils/error.js";

const videoServices = {

  createVideo: async (user_id, data) => {
    const userId = validator.mongooseId(user_id);
    const url = validator.youtubeUrl(data.youtube_url);
    const ytid = url.match(/(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/);
    const yt_thumbnail = `https://i.ytimg.com/vi/${ytid[3]}/maxresdefault.jpg`;

    const videoDoc = new Video({
      title: data.title,
      youtube_url: url,
      thumbnail: yt_thumbnail,
      user: userId,
    });

    const { _id, title, youtube_url, thumbnail } = await videoDoc.save();

    return {
      _id,
      title,
      youtube_url,
      thumbnail,
    }
  },

  updateViewsVideo: (videoDoc) => {
    videoDoc.views += 1;
    return videoDoc.save();
  },

  getAllVideos: async (category) => {
    const videos = await Video.find({}, "_id title thumbnail views createdAt")
    .populate({path:"user", select: "-_id username picture"})

    if (category === "populars") {
      return videos.sort((a,b) => b.views - a.views);
    }
    else if (category === "latest") {
      return videos.sort((a,b) => b.createdAt - a.createdAt);
    }
    else {
      return videos;
    }

  },

  getVideoById: async (video_id) => {
  
    const video = await Video.findById(
      video_id,
      "title youtube_url views createdAt updatedAt views"
    )
    .populate({path:"user", select: "-_id username picture"});

    if(!video) {
      throw new ErrorHandler("video not available", 404);
    }

    return video;
  },

  getVideosByUserId: async (user_id) => {
    const userId = validator.mongooseId(user_id);
    const user = await User.findById(user_id);

    if (!user) {
      ErrorHandler(404, "user not found");
    }

    return Video.find({ user: userId });
  },

  searchVideo: (title) => {
    const regex = new RegExp(title, 'i');
    return Video.find({title: regex}, "_id title thumbnail views createdAt")
    .populate({path:"user", select: "-_id username picture"})
  },

  updateVideo: async (user_id, video_id, data) => {
    const youtubeURL = data?.youtube_url;

    if (youtubeURL) {
      const url = validator.youtubeUrl(youtubeURL);
      const ytid = url.match(
        /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/,
      )[3];

      data.youtube_url = url;
      data.thumbnail = `https://i.ytimg.com/vi/${ytid}/maxresdefault.jpg`;
    }

    delete data.views;
    delete data._id;

    const updatedVideo = await Video.findOneAndUpdate(
      {
        _id: video_id, 
        user: user_id
      }, 
      {...data},
      {
        new: true,
        select: "title youtube_url thumbnail updatedAt",
      }
    )

    if(!updatedVideo) {
      throw new ErrorHandler("update video failed", 400);
    }

    return updatedVideo;
  },

  deleteVideo: async (id) => {
    await Product.deleteMany({ video_id: id });
    await Comment.deleteMany({ video_id: id });
    return Video.findByIdAndDelete(id);
  },
};

export default videoServices;
