import { RequestHandler, Response } from 'express';
import { ITask } from '../interfaces/ITask';
import Task from '../models/Task';

export const createTask: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const { title, description, status } = req.body;
    const user = req.user;
    const author: string = user._id;
    const newTask: ITask = new Task({ title, description, status, author });
    const taskSaved: ITask = await newTask.save();
    return res.status(201).json({ message: 'Task created!', taskSaved });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const getAllTasks: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const tasks: ITask[] = await Task.find().populate('author');

    if (!tasks) return res.status(400).json({ message: 'Tasks not founded' });

    return res.status(200).json({ message: 'Tasks founded:', tasks });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
export const getTask: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const task: ITask | null = await Task.findById(req.params.id);
    if (!task) return res.status(400).json({ message: 'Task not founded' });
    return res.status(200).json({ message: 'Task founded:', task });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const deleteAllTasks: RequestHandler = async (req, res): Promise<Response> => {
  try {
    await Task.deleteMany();
    return res.json({ message: 'All tasks deleted!' });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
export const deleteTask: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const task: ITask | null = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(400).json({ message: 'Task not founded' });
    return res.status(200).json({ message: 'Task deleted:', task });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
export const updateTask: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const task: ITask | null = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(400).json({ message: 'Task not founded' });
    return res.status(200).json({ message: 'Task updated:', task });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const userTasks: RequestHandler = async (req, res): Promise<Response> => {
  try {
    return res.json({ message: 'user tasks!' });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
