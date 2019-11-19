const mongoose = require('mongoose');
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
  Status: {
    type: String
  },
  Email: {
    type: String
  },
});

//create the model
const userModel = mongoose.model('users', userSchema);

//export the model
module.exports = userModel;