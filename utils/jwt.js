import jwt from "jsonwebtoken";

const jwtUtils = {
  generateToken(data) {
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
    return token;
  },
};

export default jwtUtils;
