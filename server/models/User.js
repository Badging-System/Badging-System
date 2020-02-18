const mongoose = require("mongoose");
ObjectID = require("mongodb").ObjectID;
const Schema = mongoose.Schema;

//create a schema
const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
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
  Teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "teams"
    }
  ]
});

// Creating the user model
const userModel = mongoose.model("users", userSchema, "users");

// Imported team schema to reference its ids properly
// Team.teamModel = mongoose.model('teams', Team.teamSchema);

module.exports = userModel;
