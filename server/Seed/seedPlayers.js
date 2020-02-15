const User = require("../models/User");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../.env")
});

async function seedUsers(insertData, callback) {
  await mongoose.connect(process.env.HOST + process.env.DBNAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await User.deleteMany({ Role: "User" });
  let result = await User.collection.insertMany(insertData);
  await mongoose.connection.close();
  return result;
}

module.exports.seedUsers = seedUsers;
