const throwError = (errorStatus, message) => {
  const error = new Error(message);
  error.status = errorStatus;
  throw error;
};

export default throwError;