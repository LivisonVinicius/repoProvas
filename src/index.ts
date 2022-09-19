import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import router from "./routers/index";
import errorHadler from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHadler);

export default app;
