const { matchedData } = require("express-validator");
const BaseError = require("../errors/BaseError");
const ObjectId = require("mongoose").Types.ObjectId;
const List = require("../models/List");
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.aggregate([
      { $match: { createdBy: ObjectId(req.userId) } },
      { $group: { _id: "$listId", tasksByList: { $push: "$$ROOT" } } },
    ]);

    return res.status(200).json({ tasks });
  } catch (error) {
    const baseError = new BaseError("ERR_GET_TASKS", 400, error.message);
    return res.status(400).json({ error: baseError });
  }
};

const createTask = async (req, res) => {
  const { task: taskObj } = matchedData(req);
  const { listId } = taskObj;

  try {
    const list = await List.findOne({
      _id: listId,
      createdBy: req.userId,
    }).lean();

    if (!list) {
      const baseError = new BaseError(
        "ERR_CREATE_TASK",
        401,
        `The list isn't yours.`
      );
      return res.status(401).json({ error: baseError });
    }

    const task = await Task.create({ ...taskObj, createdBy: req.userId });

    return res.status(201).json({ task });
  } catch (error) {
    const baseError = new BaseError("ERR_CREATE_TASK", 400, error.message);
    return res.status(400).json({ error: baseError });
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
      const baseError = new BaseError(
        "ERR_NOT_FOUND_TASK",
        404,
        `The task isn't exists.`
      );
      return res.status(404).json({ error: baseError });
    }

    return res.status(200).json({ task });
  } catch (error) {
    const baseError = new BaseError("ERR_PATCH_TASK", 400, error.message);
    return res.status(400).json({ error: baseError });
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
      const baseError = new BaseError(
        "ERR_NOT_FOUND_TASK",
        404,
        `The task isn't exists.`
      );
      return res.status(404).json({ error: baseError });
    }

    return res.status(200).json({ task });
  } catch (error) {
    const baseError = new BaseError("ERR_DELETE_TASK", 400, error.message);
    return res.status(400).json({ error: baseError });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
