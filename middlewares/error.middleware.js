import response from "../utils/response.js";

const errorMiddleware = (err, req, res, next) => {
  response.failed(res, err.message, err.statusCode);
};

export default errorMiddleware;
