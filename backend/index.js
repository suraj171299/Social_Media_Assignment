import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js";
import errorHandler from "./middleware/error.js";
import connectDB from "./utils/db.js";
import { app, server, io } from "./socket/socket.js";
dotenv.config({});


app.use(express.json())
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));
app.use(bodyParser.json( { limit: "5mb" } ));
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/app/user", userRoutes)
app.use("/app/post", postRoutes)

app.use(errorHandler);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
})