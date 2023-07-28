import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!(bearerToken || bearerToken?.includes("Bearer"))) {
      throw new Error("Unauthorized");
    }

    const token = bearerToken.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user_id = decodedToken._id;

    return next();
  } 
  catch (error) {
    res.status(401);
    res.send({
      error:
        error instanceof jwt.TokenExpiredError
          ? "Session Expired"
          : error.message,
    });
    res.end();
  }
};

export default authMiddleware;
