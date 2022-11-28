import { Request, Response } from "express";
import Task from "../models/Task";

export const getAllTasks = async (req: Request, res: Response) => {
    const Tasks = await Task.find();
    try {
        return res.status(200).json(Tasks);
    } catch (error) {
        return res.status(500).json({err: error})
    }
}

export const getTaskById = async (req: Request, res: Response) => {
    const { id} = req.params;
    const singleTask = await Task.findById({_id: id});
    try {
        return res.status(200).json(singleTask);
    } catch (error) {
        return res.status(500).json({err: error});
    }
}

export const createTask = async (req: Request, res: Response) => {
    const TaskToCreate = await Task.create(req.body);
    try {
        return res.status(201).json(TaskToCreate);
    } catch (error) {
        return res.status(500).json({msg: "Couldn't create the Task"})
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const TaskToUpdate = await Task.findByIdAndUpdate(id, req.body, {new: true})
    try {
        return res.status(202).json(TaskToUpdate);
    } catch (error) {
        return res.status(500).json({msg: "Couldn't update the Task"});
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    try {
        return res.status(203).json({message: "deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "couldn't delete the Task"})
    }
}














