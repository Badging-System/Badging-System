const mongoose = require("mongoose");
ObjectID = require("mongodb").ObjectID;
const Schema = mongoose.Schema;

//create a schema
const taskSchema = new Schema({
  Description: {
    type: String
  },
  Badge: {
    type: Schema.Types.ObjectId,
    ref: "badges"
  }
});

const taskModel = mongoose.model("tasks", taskSchema, "tasks");

module.exports = taskModel;
