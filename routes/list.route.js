const express = require("express");
const {
  createList,
  deleteList,
  updateList,
} = require("../controllers/list.controller");

const router = express.Router();

router.post("/", createList);
router.patch("/:listId", updateList);
router.delete("/:listId", deleteList);

module.exports = router;
