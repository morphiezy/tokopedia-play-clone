import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/error.js";

const authMiddleware = async (req, res, next) => {

  try {
    const bearerToken = req.get("authorization");
    const token = bearerToken.replace("Bearer ", "");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user_id = decodedToken._id;
    return next();

  } 
  catch (error) {
    const jwtError = new ErrorHandler();

    if(error.name === "TokenExpiredError") {
      jwtError.message = "session expired";
      jwtError.statusCode = 401;
    }
    else {
      jwtError.message = "authentication failed";
      jwtError.statusCode = 401;
    }

    throw jwtError;
  }

};

export default authMiddleware;
