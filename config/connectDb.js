const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/expense-management");
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDb;
