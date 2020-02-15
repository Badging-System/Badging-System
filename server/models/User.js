const mongoose = require("mongoose");
ObjectID = require("mongodb").ObjectID;
const Schema = mongoose.Schema;

//create a schema
const userSchema = new Schema({
  Username: {
    type: String
  },
  First_name: {
    type: String
  },
  Last_name: {
    type: String
  },
  Role: {
    type: String
  },
  Active: {
    type: Boolean
  },
  Email: {
    type: String
  },
  Team: {
    type: ObjectID
  }
});

//create the model
const userModel = mongoose.model("users", userSchema);

//export the model
module.exports = userSchema;
module.exports = userModel;
