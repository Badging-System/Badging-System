const mongoose = require("mongoose");
ObjectID = require("mongodb").ObjectID;
const Schema = mongoose.Schema;

//create a schema
const badgeSchema = new Schema({
  Name: {
    type: String
  },
  Description: {
    type: String
  },
  Team: {
    type: Schema.Types.ObjectId,
    ref: "teams"
  },
  Recipients: [{type: Schema.Types.ObjectId, ref: "users"}],
  Tasks: [{Description: {type: String}, _id: {type: Schema.Types.ObjectId}}]
});

const badgeModel = mongoose.model("badges", badgeSchema, "badges");

module.exports = badgeModel;
