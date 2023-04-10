import { Request, Response, NextFunction } from "express"
import task from "../types/types";
import connectionDb from "../database/database.js";

export async function getTasks (req: Request, res: Response, next: NextFunction) : Promise<Response> {
  try {
    const tasks = await connectionDb.query('SELECT * FROM tasks ORDER BY id ASC');
    res.status(200).send(tasks.rows);
  } catch (error) {
    return res.send(error.message);
  }
}

export async function createTask (req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { name, assignedTo } = req.body as task;
    const newTask: task = { name, assignedTo };
    const task = await connectionDb.query('INSERT INTO tasks (name, "assignedTo") VALUES ($1, $2) RETURNING *', [name, assignedTo]);
    res.status(201).send(task.rows);
  } catch (error) {
    return res.send(error.message);
  }
}

export async function editTask (req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const { name, assignedTo } = req.body as task;
    const task = await connectionDb.query('UPDATE tasks SET name = $1, "assignedTo" = $2 WHERE id = $3 RETURNING *', [name, assignedTo, id]);
    res.status(200).send(task.rows);
  } catch (error) {
    return res.send(error.message);
  }
}

export async function deleteTask (req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const task = await connectionDb.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.status(200).send("Task deleted successfully");
  } catch (error) {
    return res.send(error.message);
  }
}





