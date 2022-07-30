const List = require("../models/List");
const Task = require("../models/Task");

const createList = async (req, res) => {
  const { listName } = req.body;

  try {
    const list = await List.create({ listName });

    return res.status(201).json(list);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateList = async (req, res) => {
  const { listId } = req.params;
  const { list: listObj } = req.body;

  try {
    const list = await List.findOneAndUpdate({ _id: listId }, listObj, {
      new: true,
      runValidators: true,
    });

    if (!list) {
      const error = new Error(`The list isn't exists.`);
      error.status = 404;
      throw error;
    }

    return res.status(200).json({ list });
  } catch (error) {
    console.log(error.message);
    return res.status(error.status || 400).json({ error });
  }
};

const deleteList = async (req, res) => {
  const { listId } = req.params;

  try {
    const list = await List.findOneAndDelete({ _id: listId });

    await Task.deleteMany({ listId });

    if (!list) {
      const error = new Error(`THe list isn't exists.`);
      error.status = 404;
      throw error;
    }

    return res.status(200).json({ list });
  } catch (error) {
    console.log(error.message);
    return res.status(error.status || 400).json({ error });
  }
};

module.exports = {
  createList,
  updateList,
  deleteList,
};
