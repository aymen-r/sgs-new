import mongoose from "mongoose";
import express from "express";
import clientRouter from "./routes/clientRoutes.js";
import "dotenv/config";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/sgs")
  .then(() => {
    console.log("connected to db success");
  })
  .catch((err) => {
    console.log(err.message);
  });

// const __filename = fileURLToPath(import.meta.url);

app(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "./build")));

app.use("/api/client", clientRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// heroku start

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./front/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./front/build/index.html"))
);
// heroku end

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
