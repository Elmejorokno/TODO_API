const { matchedData } = require("express-validator");
const List = require("../models/List");
const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { task: taskObj } = matchedData(req);
  const { listId } = taskObj;

  try {
    const list = await List.findOne({
      _id: listId,
      createdBy: req.userId,
    }).lean();

    if (!list) {
      const error = new Error(`The list isn't yours.`);
      error.status = 401;
      throw error;
    }

    const task = await Task.create({ ...taskObj, createdBy: req.userId });

    return res.status(201).json({ task });
  } catch (error) {
    console.log(error.message);
    return res.status(error.status || 400).json({ error, msg: error.message });
  }
};

const updateTask = async (req, res) => {
  const { task: taskObj, taskId } = matchedData(req);

  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: req.userId },
      {
        ...taskObj,
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      const error = new Error(`The task isn't exists.`);
      error.status = 404;
      throw error;
    }

    return res.status(200).json({ task });
  } catch (error) {
    console.log(error.message);
    return res.status(error.status || 400).json({ error, msg: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = matchedData(req);

  try {
    const task = await Task.findOneAndDelete({
      _id: taskId,
      createdBy: req.userId,
    });

    if (!task) {
      const error = new Error(`The task isn't exists.`);
      error.status = 404;
      throw error;
    }

    return res.status(200).json({ task });
  } catch (error) {
    console.log(error.message);
    return res.status(error.status || 400).json({ error });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
};
