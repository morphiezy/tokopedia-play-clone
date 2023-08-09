import response from "../utils/response.js";
import ProductServices from "../services/product.service.js";

const createProduct = async (req, res) => {
  const product = await ProductServices.createProduct(req.body);
  response.success(res, product, 201);
};

const getAllProducts = async (req, res) => {
  const products = await ProductServices.getAllProducts();
  response.success(res, products, 200);
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  const product = await ProductServices.getProductById(productId);
  response.success(res, product, 200);
};

const getProductByVideoId = async (req, res) => {
  const productId = req.params.id;
  const product = await ProductServices.getProductByVideoId(productId);
  response.success(res, product, 200);
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const data = req.body;

  const updatedProduct = await ProductServices.updateProduct(productId, data);
  response.success(res, updatedProduct, 200);
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  await ProductServices.deleteProduct(productId);
  response.success(res, null, 204);
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByVideoId,
  updateProduct,
  deleteProduct,
};
