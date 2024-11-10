import { Router } from "express";
import { getAllUsers, registerUser, loginUser, getUserDetails } from "../controllers/user.controllers.js";

const router = Router();

router.get("/all", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/userId/:id", getUserDetails);

export default router