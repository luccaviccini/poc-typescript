import { Router} from "express";
import {getTasks, createTask, editTask, deleteTask } from "../controllers/tasks.controllers.js";


const tasksRoutes = Router();

tasksRoutes.get("/tasks", getTasks);
tasksRoutes.post("/tasks", createTask);
tasksRoutes.put("/tasks/:id", editTask)
tasksRoutes.delete("/tasks/:id", deleteTask)


export default tasksRoutes;
