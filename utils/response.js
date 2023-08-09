const response = {

  success(response, values, statusCode = 200) {
    const data = {
      succes: true,
      data: values,
    };

    if (statusCode !== 204) {
      response.json(data);
    }

    response.status(statusCode);
    response.end();
  },

  failed(response, message, statusCode = 500) {
    const data = {
      status: false,
      message: message,
    };

    response.status(statusCode);
    response.json(data);
  }

};

export default response;
