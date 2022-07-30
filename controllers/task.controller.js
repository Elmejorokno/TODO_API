const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { task: taskObj } = req.body;

  try {
    const task = await Task.create(taskObj);

    return res.status(201).json({ task });
  } catch (error) {
    console.log(error.message);
    return res.status(error.status || 400).json({ error });
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { task: taskObj } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId },
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
    return res.status(error.status || 400).json({ error });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: taskId });

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
