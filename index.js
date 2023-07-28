import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectMongoDB } from "./config/db.js";

import publicRoute from "./routes/public.route.js";
import protectedRoute from "./routes/protected.route.js";

dotenv.config();
connectMongoDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", publicRoute);
app.use("/api", protectedRoute);

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
