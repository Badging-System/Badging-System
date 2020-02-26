const mongoose = require("mongoose");
ObjectID = require("mongodb").ObjectID;
const Schema = mongoose.Schema;

//create a schema
const taskUserJoinSchema = new Schema({
  Description: {
    type: String
  },
  Badge: {
    type: Schema.Types.ObjectId,
    ref: "badges"
  },
  Team: {
    type: Schema.Types.ObjectId,
    ref: "teams"
  },
  Award: {
    type: Boolean
  },
  Tasks_Completed: [
    {
      type: Schema.Types.ObjectId,
      ref: "tasks"
    }
  ]
});

const taskModel = mongoose.model(
  "taskUserJoin",
  taskUserJoinSchema,
  "tasksUserJoin"
);

module.exports = taskModel;
