const Badge = require("../models/Badge");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../.env")
});

async function seedBadges(insertData) {
  await mongoose.connect(process.env.HOST + process.env.DBNAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  //delete first
  await Badge.deleteMany({});
  let result = await Badge.collection.insertMany(insertData);
  await mongoose.connection.close();
  return result;
}
module.exports.seedBadges = seedBadges;
