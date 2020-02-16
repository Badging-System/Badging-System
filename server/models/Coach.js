const mongoose = require('mongoose');
ObjectID = require('mongodb').ObjectID;
const Schema = mongoose.Schema;

//create a schema
const coachSchema = new Schema({
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
  Admin: {
    type: ObjectID
  },
  Badges: [
    {
      type: String
    }
  ],
  teams: [{ type: Schema.Types.ObjectId, ref: 'teams' }]
});

// Creating coach model
const coachModel = mongoose.model('coaches', coachSchema);

// Imported user schema to reference its ids properly
// Exporting variables to be used in coach controller as well as User schema
module.exports.coachSchema = coachSchema;
module.exports.coachModel = coachModel;
