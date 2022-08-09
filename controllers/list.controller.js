const { matchedData } = require("express-validator");
const BaseError = require("../errors/BaseError");
const List = require("../models/List");
const Task = require("../models/Task");

const getAllLists = async (req, res) => {
  try {
    const lists = await List.find({
      createdBy: req.userId,
    });

    return res.status(200).json({ lists });
  } catch (error) {
    const baseError = new BaseError("ERR_GET_LISTS", 400, error.message);
    return res.status(400).json({ error: baseError });
  }
};

const createList = async (req, res) => {
  const { list: listObj } = matchedData(req);

  try {
    const list = await List.create({ ...listObj, createdBy: req.userId });

    return res.status(201).json({ list });
  } catch (error) {
    const baseError = new BaseError("ERR_CREATE_LIST", 400, error.message);
    return res.status(400).json({ error: baseError });
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
      const baseError = new BaseError(
        "ERR_NOT_FOUND_LIST",
        404,
        `The list isn't exists.`
      );
      return res.status(404).json({ error: baseError });
    }

    return res.status(200).json({ list });
  } catch (error) {
    const baseError = new BaseError("ERR_PATCH_LIST", 400, error.message);
    return res.status(400).json({ error: baseError });
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
      const baseError = new BaseError(
        "ERR_NOT_FOUND_LIST",
        404,
        `The list isn't exists.`
      );
      return res.status(404).json({ error: baseError });
    }

    return res.status(200).json({ list });
  } catch (error) {
    const baseError = new BaseError("ERR_DELETE_LIST", 400, error.message);
    return res.status(400).json({ error: baseError });
  }
};

module.exports = {
  getAllLists,
  createList,
  updateList,
  deleteList,
};
