import mongoose from "mongoose";
import ErrorHandler from "./error.js";
import User from "../models/user.model.js";

const validator = {
  mongooseId: (id) => {
    if (!mongoose.isValidObjectId(id)) {
      throw new ErrorHandler("Invalid ID", 400);
    }

    return id;
  },

  youtubeUrl: (url) => {
    const regex = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;

    if (!url || !regex.test(url)) {
      throw new ErrorHandler("invalid youtube url", 400);
    }

    return url;
  },

  username: async (text) => {
    const regex = /^[a-zA-Z0-9]{4,12}$/;

    if (!text || !regex.test(text)) {
      throw new ErrorHandler(
        "username must between 4 - 12 characters and only contains alphabet and number",
        400,
      );
    }

    const userAlready = await User.findOne({ username: text });

    if (userAlready) {
      throw new ErrorHandler("username already taken", 400);
    }

    return text;
  },

  password: (pw) => {
    const regex = /^(?=.*[A-Z])(?=.*[\d!@#$%^&*()\-_=+{}[\]\\|:;"'<>,.?\/]).{6,12}$/;

    if (!pw || !regex.test(pw)) {
      throw new ErrorHandler(
        "password must between 6 - 12 character and atleast contain one uppercase, symbol or number.",
        400,
      );
    }

    return pw;
  },
};

export default validator;
