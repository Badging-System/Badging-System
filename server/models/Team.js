const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

//create a schema
const teamSchema = new Schema({
  Name: {
    type: String
  },
  Coach: {
    type: String
  },
  Admin: {
    type: String
  },
  Badges: [{
    type: String
  }],
  Members: [{type: Schema.Types.ObjectId, ref: 'users'}],
});

// Creating team model
const teamModel = mongoose.model('teams', teamSchema);

// Imported user schema to reference its ids properly
// User.userModel = mongoose.model('users', User.userSchema);
// Exporting variables to be used in Team controller as well as User schema
module.exports.teamSchema = teamSchema;
module.exports.teamModel = teamModel;