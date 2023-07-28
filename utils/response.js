const response = {
  success(response, values, statusCode = 200) {
    const data = {
      status: "success",
      data: values,
    };
    response.status(statusCode);
    if (statusCode !== 204) response.json(data);
    response.end();
  },

  failed(response, message, statusCode = 500) {
    const data = {
      status: "failed",
      message: message,
    };
    response.status(statusCode).json(data);
    response.end();
  },
};

export default response;
