import express, { Router } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes";

dotenv.config();

const app = express();

app.use(cors({ credentials: true }));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT = process.env.PORT || 6969;

const MONGO_URL = process.env.DBURL;

mongoose.Promise = Promise;

mongoose.connect(MONGO_URL);

mongoose.connection.on("error", (error: Error) => console.log(error));

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

app.use('/',router());
