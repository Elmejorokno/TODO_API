const express = require("express");
const {
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

router.post("/", createListValidator, createList);
router.patch("/:listId", updateListValidator, updateList);
router.delete("/:listId", deleteListValidator, deleteList);

module.exports = router;
