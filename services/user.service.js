import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import validator from "../utils/validator.js";
import jwtUtils from "../utils/jwt.js";
import ErrorHandler from "../utils/error.js";

const userServices = {
    
  register: async (data) => {
    const { username, password } = data;

    const validateUsername = await validator.username(username);
    const validatePassword = validator.password(password);
    const encryptedPassword = await bcrypt.hash(validatePassword, 10);

    const userDoc = new User({
      username: validateUsername,
      password: encryptedPassword,
    });

    const user = await userDoc.save();
    const token = jwtUtils.generateToken({ _id: user._id });

    return { token };
  },

  login: async (data) => {
    const { username, password } = data;
    const user = await User.findOne({ username: username });

    if (!user) {
      throw new ErrorHandler("account not found", 400);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new ErrorHandler("password is incorrect", 400);
    }

    const token = jwtUtils.generateToken({ _id: user._id });
    return { token };
  },

  updateUser: async (user_id, data) => {
    const { username, password } = data;
    const userId = validator.mongooseId(user_id);

    const updatedData = {};

    if (username) {
      const validateUsername = await validator.username(username);
      updatedData.username = validateUsername;
    }
    
    if (password) {
      const pw = validator.password(password);
      const encryptedPassword = await bcrypt.hash(pw, 10);
      updatedData.password = encryptedPassword;
    }

    delete data._id;

    return User.findByIdAndUpdate(
      userId,
      { ...updatedData },
      { select: "-_id username" },
    );
  },

  getUserById: async (user_id) => {
    const userId = validator.mongooseId(user_id);
    return await User.findById(userId,"-_id username picture");
  }

};

export default userServices;
