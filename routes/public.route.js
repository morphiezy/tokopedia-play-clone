import express from "express";
import {
  getAllVideo,
  getVideoById,
  getVideoByUserId,
} from "../controllers/video.controller.js";
import { getCommentsByVideoId } from "../controllers/comment.controller.js";
import { login, register } from "../controllers/user.controller.js";
import {
  getAllProducts,
  getProductById,
  getProductByVideoId,
} from "../controllers/product.controller.js";
import { getCommentById } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/videos", getAllVideo);
router.get("/videos/:id", getVideoById);
router.get("/videos/:id/products", getProductByVideoId);
router.get("/videos/:id/comments", getCommentsByVideoId);

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

router.get("/comments/:id", getCommentById);

router.post("/auth/login", login);
router.post("/auth/register", register);

router.get("/users/:id/videos", getVideoByUserId);

export default router;
