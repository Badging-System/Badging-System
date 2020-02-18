const mongoose = require("mongoose");
ObjectID = require("mongodb").ObjectID;
const Schema = mongoose.Schema;

//create a schema
const teamSchema = new Schema({
  Name: {
    type: String
  },
  Coach: {
    type: ObjectID
  },
  Admin: {
    type: ObjectID
  },
  Badges: [{
    type: String
  }],
  Members: [{type: Schema.Types.ObjectId, ref: 'users'}],
});

// Creating team model
const teamModel = mongoose.model('teams', teamSchema);

module.exports = teamModel;
