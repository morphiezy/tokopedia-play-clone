import Video from "../models/video.model.js";
import Product from "../models/product.model.js";
import validator from "../utils/validator.js";
import throwError from "../utils/error.js";

const productServices = {

    async createProduct(product_data) { 
        const id = validator.mongooseId(product_data.video_id);
        const video = await Video.findById(id);
        
        if(!video) throwError(404, "Video not found");

        const productDoc = new Product(product_data);
        return productDoc.save();
    },

    getAllProducts() {
        return Product.find({});
    },
    
    getProductById(product_id) {
        const id = validator.mongooseId(product_id);
        return Product.findById(id);
    },

    async getProductByVideoId(video_id) {
        const videoId = validator.mongooseId(video_id);
        const product = await Product.find({video_id : videoId });

        if(!product) {
            throwError(404,"Video not found")
        }

        return product;
    },

    async updateProduct(id, data) {
        const productId = validator.mongooseId(id);

        const product = await Product.findById(productId);

        if(!product) {
            throwError(404,"Product not found")
        }
        
        return Product.findByIdAndUpdate(productId, data, { new: true })
    },

    deleteProduct(id) {
        const productId = validator.mongooseId(id);
        return Product.findByIdAndDelete(productId);
    }

}

export default productServices;