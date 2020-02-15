const User = require("../models/User");
const mongoose = require("mongoose");

async function seedUsers(insertData, callback) {
  await mongoose.connect(process.env.HOST + process.env.DBNAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await User.deleteMany({ Status: "User" });
  let result = await User.collection.insertMany(insertData);
  await mongoose.connection.close();
  return result;
}

module.exports.seedUsers = seedUsers;
