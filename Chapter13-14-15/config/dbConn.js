const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};
module.exports = connectDB;
