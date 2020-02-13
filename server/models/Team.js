const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./User');

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
  Members: [userSchema],
});

module.exports = teamSchema;
