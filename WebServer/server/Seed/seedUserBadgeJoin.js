const BadgeUserJoin = require("../models/BadgeUserJoin");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../.env")
});

async function seedBadgeUserJoin(insertData) {
  await mongoose.connect(process.env.HOST + process.env.DBNAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  //delete first
  await BadgeUserJoin.deleteMany({});
  let result = await BadgeUserJoin.collection.insertMany(insertData);
  await mongoose.connection.close();
  return result;
}
module.exports.seedBadgeUserJoin = seedBadgeUserJoin;
