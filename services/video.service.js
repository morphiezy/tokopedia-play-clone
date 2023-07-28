import Video from "../models/video.model.js";
import Product from "../models/product.model.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import validator from "../utils/validator.js"
import throwError from "../utils/error.js";

const videoServices = {
  
  async createVideo(user_id, yt_title, yt_url) {
    const userId = validator.mongooseId(user_id);
    const url = validator.youtubeUrl(yt_url);
    const ytid = url.match(/(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/,)[3];
    const yt_thumbnail = `https://i.ytimg.com/vi/${ytid}/maxresdefault.jpg`;

    const videoDoc = new Video({
      title: yt_title,
      youtube_url: url,
      thumbnail: yt_thumbnail,
      user_id: userId,
    });

    const { _id, title, youtube_url, thumbnail } = await videoDoc.save();

    return {
      _id,
      title,
      youtube_url,
      thumbnail,
    };
  },

  getAllVideos() {
    return Video.find({}, "_id title thumbnail views createdAt updatedAt");
  },

  getVideoById(id) {
    const videoId = validator.mongooseId(id);
    return Video.findByIdAndUpdate(videoId,{ 
      $inc: { "views" : 1 } ,
      new: true,
      select: "_id title youtube_url views createdAt updatedAt views"
    });
  },

  async getVideosByUserId(user_id) {
    const userId = validator.mongooseId(user_id);
    const user = await User.findById(user_id);

    if(!user) {
      throwError(404, "user not found");
    }

    return Video.find({ user_id: userId });
  },

  updateVideoById(id, data) {
    const videoId = validator.mongooseId(id);
    const youtubeURL = data?.youtube_url;

    if(youtubeURL) {
      const url = validator.youtubeUrl(youtubeURL);
      const ytid = url.match(/(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/,)[3];
      data.youtube_url = url;
      data.thumbnail = `https://i.ytimg.com/vi/${ytid}/maxresdefault.jpg`;
    }
    
    return Video.findByIdAndUpdate(videoId, data, { new: true, select: 'title youtube_url thumbnail updatedAt' });
  },

  async deleteVideoById(id) {
    const videoId = validator.mongooseId(id);
    await Product.deleteMany({video_id: videoId});
    await Comment.deleteMany({video_id: videoId});
    return Video.findByIdAndDelete(id);
  },
};

export default videoServices;
