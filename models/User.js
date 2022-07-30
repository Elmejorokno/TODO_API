const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema, model } = mongoose;

const regExpEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator(v) {
        return regExpEmail.test(v);
      },
      message: (props) => `${props.value} isn't a valid email.`,
    },
    unique: [true, "Email is already in use"],
    index: { unique: true },
    required: [true, "Must provide an email."],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Must provide a password."],
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    return next();
  } catch (error) {
    throw new Error(`Error hashing the password. ${error.message}`);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model("users", userSchema);
module.exports = User;
