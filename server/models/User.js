const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teamSchema = require('./Team');

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
  Status: {
    type: String
  },
  Email: {
    type: String
  },
  Teams: [{
    type: Schema.Types.ObjectId, ref: 'teams'
  }]


});

//create the model
const userModel = mongoose.model('users', userSchema);

//imported team schema to reference its ids properly
const teamModel = mongoose.model('teams', teamSchema);

//export the user model
module.exports = userModel;

//export the team model
module.exports = teamModel;