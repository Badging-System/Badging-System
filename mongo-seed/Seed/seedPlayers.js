const User = require("../models/User");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env")
});

async function seedUsers(insertData) {
  await mongoose.connect(process.env.HOST + process.env.DBNAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  //delete first
  await User.deleteMany({ Role: "User" });
  let result = await User.collection.insertMany(insertData);
  await mongoose.connection.close();
  return result;
}

module.exports.seedUsers = seedUsers;
