import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import the routes
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

// use the routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);



export { app }