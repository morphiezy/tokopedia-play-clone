import response from "../utils/response.js";
import ProductServices from "../services/product.service.js";

const createProduct = async (req, res) => {
  try {
    const product = await ProductServices.createProduct(req.body);
    response.success(res, product, 201);
  } 
  catch (error) {
    response.failed(res, error.message, 400);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductServices.getAllProducts();
    response.success(res, products, 200);
  } 
  catch (error) {
    response.failed(res, error.message, 500);
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductServices.getProductById(id);
    response.success(res, product, 200);
  } 
  catch (error) {
    response.failed(res, error.message, 400);
  }
};

const getProductByVideoId = async (req, res) => {
  try {
    const videoId = req.params.id;
    const product = await ProductServices.getProductByVideoId(videoId);
    response.success(res, product, 200);
  } 
  catch (error) {
    response.failed(res, error.message, 400);
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedProduct = await ProductServices.updateProduct(id, data);
    response.success(res, updatedProduct, 200);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await ProductServices.deleteProduct(id);
    response.success(res, null, 204);
  } 
  catch (error) {
    response.failed(res, error.message, error.status);
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByVideoId,
  updateProduct,
  deleteProduct,
};
