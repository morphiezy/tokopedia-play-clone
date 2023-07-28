import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { updateUser } from "../controllers/user.controller.js";
import {
  updateVideoById,
  deleteVideoByID,
  createVideo,
} from "../controllers/video.controller.js";

import {
  updateComment,
  deleteComment,
  createComment,
} from "../controllers/comment.controller.js";

import {
  updateProduct,
  deleteProduct,
  createProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.patch("/videos/:id", updateVideoById);
router.delete("/videos/:id", deleteVideoByID);
router.post("/videos", createVideo);

router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.post("/products", createProduct);

router.patch("/comments/:id", updateComment);
router.post("/comments", createComment);
router.delete("/comments/:id", deleteComment);

router.patch("/users/:id", updateUser);

export default router;
