import mongoose from "mongoose";
import throwError from "./error.js";
import User from "../models/user.model.js";

const validator = {

  mongooseId(id) {
    if (!mongoose.isValidObjectId(id)) throwError(400, "Invalid ID");
    return id;
  },
  youtubeUrl(url) {
    const regex = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
    if (!url || !url.trim().length) throwError(400, "Youtube URL is Required!");
    if (!regex.test(url)) throwError(400, "Invalid Youtube URL");

    return url;
  },
  async username(text) {
    const regex = /^[a-zA-Z0-9]{4,12}$/;
    if (!text) throwError(400, "username is required!");
    if (!regex.test(text)) throwError(400, "username must contains 4-12 chars, alphanumeric only.");
   
    const userAlready = await User.findOne({ username: text });
    return userAlready ? throwError(400, "username already exist") : text;
  },
  password(text) {
    const regex = /^(?=.*[A-Z])(?=.*\d)[\S]{6,12}$/;
    if (!text || !text.trim().length) throwError(400, "password is required!");
    if (!regex.test(text))
      throwError(
        400,
        "password must contains : 6-12 chars, 1 uppercase, 1 number.",
      );

    return text;
  },
};

export default validator;
