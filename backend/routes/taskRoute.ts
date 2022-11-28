import { Router } from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/taskController';
const router:Router = Router();

router.get("/", getAllTasks);
router.get("/task/:id", getTaskById);
router.post("/task", createTask);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;