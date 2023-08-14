import Video from "../models/video.model.js";
import Product from "../models/product.model.js";
import validator from "../utils/validator.js";
import ErrorHandler from "../utils/error.js";

const productServices = {
  createProduct: async (product_data) => {
    const video = await Video.findById(product_data.video);

    if (!video) {
      throw new ErrorHandler("video not available", 404);
    }

    const emptyFields = ["title", "picture", "price", "url"]
      .filter((item) => !product_data[item])
      .join(", ");

    if (emptyFields) {
      throw new ErrorHandler(`${emptyFields} fields is required`, 400);
    }

    const productDoc = new Product(product_data);
    const { title, picture, price, url } = await productDoc.save();

    return {
      title,
      picture,
      price,
      url,
    };
  },

  getAllProducts: () => {
    return Product.find({});
  },

  getProductById: (product_id) => {
    const id = validator.mongooseId(product_id);
    return Product.findById(id);
  },

  getProductByVideoId: async (video_id) => {
    return await Product.find({ video: video_id }, "title picture price url")
  },

  updateProduct: async (id, product_data) => {
    const productId = validator.mongooseId(id);
    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorHandler("product not available", 404);
    }

    
    const emptyFields = Object.keys(product_data)
      .filter((item) => !product_data[item])
      .join(", ");

    if (emptyFields) {
      throw new ErrorHandler(`${emptyFields} fields is required`, 400);
    }

    delete product_data._id;

    return Product.findOneAndUpdate({ _id: productId }, product_data, {
      new: true,
      select: "-_id title picture price url",
    });
  },

  deleteProduct: (id) => {
    const productId = validator.mongooseId(id);
    return Product.findByIdAndDelete(productId);
  },
};

export default productServices;
