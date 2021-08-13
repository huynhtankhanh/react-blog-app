import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import posts from "./routers/posts.js";
import mongoose from "mongoose";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

//using routers
app.use("/posts", posts);

const PORT = process.env.PORT || 5000;
const URI = process.env.DB_URL;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
