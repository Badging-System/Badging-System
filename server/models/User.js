const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = require('./Team');

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
  Teams: [{
    type: Schema.Types.ObjectId, ref: 'teams'
  }]


});

// Creating the user model
const userModel = mongoose.model('users', userSchema);

// Imported team schema to reference its ids properly
// Team.teamModel = mongoose.model('teams', Team.teamSchema);


// Exporting variables to be used in User controller as well as Team schema
module.exports.userSchema = userSchema;
module.exports.userModel = userModel;

