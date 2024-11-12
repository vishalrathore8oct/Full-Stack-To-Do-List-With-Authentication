import { Router } from "express";
import { createTask, readTasks, updateTasks, deleteTasks } from "../controllers/task.controllers.js";
import { isAuthenticated } from "../middlewares/user.auth.js";


const router = Router();

router.post("/create", isAuthenticated, createTask)
router.get("/read", isAuthenticated, readTasks)
router.put("/update/:id", isAuthenticated, updateTasks)
router.delete("/delete/:id", isAuthenticated, deleteTasks)

export default router