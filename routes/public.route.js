import express from "express";
import {
  getAllVideo,
  watchVideo,
  getVideoByUserId,
  getVideoById,
  searchVideo,
} from "../controllers/video.controller.js";
import { getCommentsByVideoId } from "../controllers/comment.controller.js";
import { getUserById, login, register } from "../controllers/user.controller.js";
import {
  getAllProducts,
  getProductById,
  getProductByVideoId,
} from "../controllers/product.controller.js";

import { getCommentById } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/api/videos/search", searchVideo);
router.get("/api/videos", getAllVideo);
router.get("/api/videos/:id", getVideoById);
router.patch("/api/videos/watch/:id", watchVideo);
router.get("/api/videos/:id/products", getProductByVideoId);
router.get("/api/videos/:id/comments", getCommentsByVideoId);

router.get("/api/products", getAllProducts);
router.get("/api/products/:id", getProductById);

router.get("/api/comments/:id", getCommentById);

router.post("/api/auth/login", login);
router.post("/api/auth/register", register);

router.get("/api/users/:id", getUserById);
router.get("/api/users/:id/videos", getVideoByUserId);

export default router;
