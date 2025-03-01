import express from "express";
import mongoose from "mongoose";

import TaskModel from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json({
      status: "success",
      data: tasks,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findById(id);
    res.status(200).json({
      status: "success",
      data: task,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createTask = async (req, res) => {
  const body = req.body;
  const newTask = new TaskModel(body);
  try {
    await newTask.save();
    res.status(200).json({
      status: "success",
      data: body,
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, message, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({
      message: `No task with id: ${id}`,
    });

  const updatedTask = { title, message, status, _id: id };

  await TaskModel.findByIdAndUpdate(id, updatedTask, { new: true });

  res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({
      message: `No task with id: ${id}`,
    });
  await TaskModel.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "Task deleted successfully.",
  });
};
