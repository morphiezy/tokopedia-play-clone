import userServices from "../services/user.service.js";
import response from "../utils/response.js";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return response.failed(res,"username & password required.",400);
    }

    const user = await userServices.register(req.body);
    response.success(res, user, 201);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
};

const login = async (req, res ) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return response.failed(res,"username & password required.",400);
    }

    const user = await userServices.login(req.body);
    response.success(res, user, 200);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if(!Object.values(data).length) {
       return response.failed(res,"Failed to update user",400);
    }

    const updatedUser = await userServices.updateUser(id,data);
    response.success(res,updatedUser,200);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
};

export { login, register, updateUser };
