import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import errorHandler from "./middleware/error.js";
dotenv.config();
const app = express();




//Database connection 
mongoose.connect(process.env.DATABASE).then(console.log("Database connected")).catch((err) => console.log(err));


app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json( { limit: "5mb" } ));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/app", authRoutes)
app.use("/app", postRoutes)

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})