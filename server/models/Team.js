const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./User').userSchema;

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
  Memebers: {
    type: [userSchema]
  },
});

const teamModel = mongoose.model('teams', teamSchema);

module.exports = teamModel;
