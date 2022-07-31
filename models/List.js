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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: [true, "Must provide an user id."],
    },
  },
  { timestamps: true }
);

const List = model("lists", listSchema);
module.exports = List;
