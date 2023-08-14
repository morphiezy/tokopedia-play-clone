import "express-async-errors";

import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectMongoDB } from "./config/db.js";

import publicRoute from "./routes/public.route.js";
import protectedRoute from "./routes/protected.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(publicRoute);
app.use(protectedRoute);
app.use((req, res) => {
  res.status(404).json({ message: "resource not found" }).end();
});
app.use(errorMiddleware);

connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
  });
})