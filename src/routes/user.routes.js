import { Router } from "express";
import {registerUser, loginUser, logoutUser, getUserDetails } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/user.auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/userDetails", isAuthenticated, getUserDetails);

export default router