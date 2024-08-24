import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js";
import errorHandler from "./middleware/error.js";
import connectDB from "./utils/db.js";
dotenv.config({});
const app = express();


app.use(cors());
app.use(bodyParser.json( { limit: "5mb" } ));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/app/user", userRoutes)
app.use("/app/post", postRoutes)

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
})