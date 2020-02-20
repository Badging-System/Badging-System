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
  Approved: {
    type: Boolean
  },
});

// Creating team model
const teamModel = mongoose.model('teams', teamSchema);

// Imported user schema to reference its ids properly
// User.userModel = mongoose.model('users', User.userSchema);
// Exporting variables to be used in Team controller as well as User schema
module.exports = teamModel;
