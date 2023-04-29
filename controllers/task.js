const ErrorHandler = require("../middlewares/error.js");
const Task = require("../models/task");

const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getMyTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    console.log(tasks);

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("task not found", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated Succesfully!!",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("task not found", 404));
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted Succesfully!!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newTask, getMyTask, updateTask, deleteTask };
