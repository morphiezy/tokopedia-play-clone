import userServices from "../services/user.service.js";
import response from "../utils/response.js";
import ErrorHandler from "../utils/error.js";

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    throw new ErrorHandler("username & password required", 400);
  }

  const user = await userServices.register(req.body);
  response.success(res, user, 201);
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return response.failed(res, "username & password required.", 400);
  }

  const user = await userServices.login(req.body);
  response.success(res, user, 200);
};

const updateUser = async (req, res) => {
  if (!Object.values(req.body).length) {
    return response.failed(res, "update user failed", 400);
  }

  const updatedUser = await userServices.updateUser(id, req.body);
  response.success(res, updatedUser, 200);
};

export { login, register, updateUser };
