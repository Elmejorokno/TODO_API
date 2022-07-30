const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const listSchema = new Schema(
  {
    listName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 30,
      required: [true, `Must provide a list name.`],
    },
    //TODO: add property createdBy
  },
  { timestamps: true }
);

const List = model("lists", listSchema);
module.exports = List;
