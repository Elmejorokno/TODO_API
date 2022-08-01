const { matchedData } = require("express-validator");
const List = require("../models/List");
const Task = require("../models/Task");

const getAllLists = async (req, res) => {
  try {
    const lists = await List.find({ createdBy: req.userId });

    return res.status(200).json({ lists });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const createList = async (req, res) => {
  const { list: listObj } = matchedData(req);

  try {
    const list = await List.create({ ...listObj, createdBy: req.userId });

    return res.status(201).json(list);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateList = async (req, res) => {
  const { list: listObj, listId } = matchedData(req);

  try {
    const list = await List.findOneAndUpdate(
      { _id: listId, createdBy: req.userId },
      listObj,
      {
        new: true,
        runValidators: true,
      }
    );

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
  const { listId } = matchedData(req);

  try {
    const list = await List.findOneAndDelete({
      _id: listId,
      createdBy: req.userId,
    });

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
  getAllLists,
  createList,
  updateList,
  deleteList,
};
