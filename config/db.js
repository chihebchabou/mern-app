const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = process.env.MONGO_URI;

console.log('env: ' + process.env.PORT);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Could not connect to MongoDB', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
