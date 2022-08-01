const express = require("express");
const {
  getAllLists,
  createList,
  deleteList,
  updateList,
} = require("../controllers/list.controller");
const {
  createListValidator,
  updateListValidator,
  deleteListValidator,
} = require("../validators/list.validator");

const router = express.Router();

router.get("/", getAllLists);
router.post("/", createListValidator, createList);
router.patch("/:listId", updateListValidator, updateList);
router.delete("/:listId", deleteListValidator, deleteList);

module.exports = router;
