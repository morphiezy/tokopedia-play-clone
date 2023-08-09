import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { updateUser } from "../controllers/user.controller.js";
import {
  updateVideo,
  deleteVideo,
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

router.patch("/api/videos/:id", authMiddleware, updateVideo);
router.delete("/api/videos/:id", authMiddleware, deleteVideo);
router.post("/api/videos", authMiddleware, createVideo);

router.patch("/api/products/:id", authMiddleware, updateProduct);
router.delete("/api/products/:id", authMiddleware, deleteProduct);
router.post("/api/products", authMiddleware, createProduct);

router.patch("/api/comments/:id", authMiddleware, updateComment);
router.post("/api/comments", authMiddleware, createComment);
router.delete("/api/comments/:id", authMiddleware, deleteComment);

router.patch("/api/users/:id", authMiddleware, updateUser);

export default router;
