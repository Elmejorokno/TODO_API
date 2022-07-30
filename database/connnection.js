const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGO);

    console.log(`connected to the db ✨.`);
  } catch (error) {
    console.log(`Error connecting to the db. ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
